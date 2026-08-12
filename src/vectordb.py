import logging
import os
from typing import Any, Dict, List

import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)


class VectorDB:
    """
    Manages the ChromaDB vector database for Osman AI using
    Hugging Face sentence embeddings.
    """

    def __init__(
        self,
        collection_name: str | None = None,
        embedding_model: str | None = None,
    ) -> None:

        self.collection_name = collection_name or os.getenv(
            "CHROMA_COLLECTION_NAME",
            "rag_documents",
        )

        self.embedding_model_name = embedding_model or os.getenv(
            "EMBEDDING_MODEL",
            "sentence-transformers/all-MiniLM-L6-v2",
        )

        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        self.db_path = os.getenv(
            "CHROMA_DB_PATH",
            os.path.join(BASE_DIR, "chroma_db"),
        )

        logger.info("Initializing ChromaDB...")

        self.client = chromadb.PersistentClient(path=self.db_path)

        logger.info(
            "Loading embedding model: %s",
            self.embedding_model_name,
        )

        self.embedding_model = SentenceTransformer(
            self.embedding_model_name
        )

        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={
                "description": "RAG document collection"
            },
        )

        logger.info(
            "Vector database initialized with collection: %s",
            self.collection_name,
        )

    def chunk_text(
        self,
        text: str,
        chunk_size: int = 500,
        chunk_overlap: int = 100,
    ) -> List[str]:
        """
        Split text into smaller chunks with overlap using LangChain's RecursiveCharacterTextSplitter.
        Overlap preserves context between chunks, reducing information loss at boundaries.
        """
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", " ", ""]
        )
        return splitter.split_text(text)

    def add_documents(
        self,
        documents: List[Any],
    ) -> None:
        """
        Add documents to the vector database.
        """

        logger.info("Processing %d documents...", len(documents))

        all_chunks = []
        all_metadatas = []
        all_ids = []

        for doc_idx, doc in enumerate(documents):
            chunks = self.chunk_text(doc.get("content", ""))
            source = doc.get("metadata", {}).get("source", f"doc_{doc_idx}")
            for chunk_idx, chunk in enumerate(chunks):
                all_chunks.append(chunk)
                metadata = doc.get("metadata", {}).copy()
                metadata["chunk_idx"] = chunk_idx
                all_metadatas.append(metadata)
                all_ids.append(f"{source}_chunk_{chunk_idx}")

        if not all_chunks:
            logger.info("No documents to add.")
            return

        embeddings = self.embedding_model.encode(all_chunks).tolist()


        self.collection.upsert(
            ids=all_ids,
            embeddings=embeddings,
            metadatas=all_metadatas,
            documents=all_chunks
        )

        logger.info("Documents added to vector database.")

    def search(
        self,
        query: str,
        n_results: int = 5,
        distance_threshold: float = 1.30,
    ) -> Dict[str, Any]:
        """
        Search for similar documents and apply a distance threshold
        to filter out irrelevant chunks.
        """

        query_embedding = self.embedding_model.encode([query]).tolist()

        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=n_results,
        )

        filtered_results = {"documents": [[]], "metadatas": [[]], "distances": [[]]}
        
        if results and results.get("documents") and results["documents"][0]:
            for doc, meta, dist in zip(results["documents"][0], results["metadatas"][0], results.get("distances", [[0]*n_results])[0]):
                if dist <= distance_threshold:
                    filtered_results["documents"][0].append(doc)
                    filtered_results["metadatas"][0].append(meta)
                    filtered_results["distances"][0].append(dist)

        return filtered_results