import logging
import os
from typing import Any, Dict, List

import chromadb
from sentence_transformers import SentenceTransformer

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

        self.db_path = os.getenv(
            "CHROMA_DB_PATH",
            "./chroma_db",
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
    ) -> List[str]:
        """
        Split text into smaller chunks based on word boundaries.
        """

        words = text.split()

        chunks: List[str] = []
        current_chunk: List[str] = []
        current_length = 0

        for word in words:

            if current_length + len(word) + 1 > chunk_size:

                chunks.append(" ".join(current_chunk))
                current_chunk = [word]
                current_length = len(word)

            else:

                current_chunk.append(word)
                current_length += len(word) + 1

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks

    def add_documents(
        self,
        documents: List[Any],
    ) -> None:
        """
        Add documents to the vector database.
        """

        logger.info("Processing %d documents...", len(documents))

        # TODO:
        # Implement document chunking, embedding generation,
        # and storage in ChromaDB.

        logger.info("Documents added to vector database.")

    def search(
        self,
        query: str,
        n_results: int = 5,
    ) -> Dict[str, Any]:
        """
        Search for similar documents.
        """

        # TODO:
        # Implement semantic search using ChromaDB.

        return {
            "documents": [],
            "metadatas": [],
            "distances": [],
            "ids": [],
        }