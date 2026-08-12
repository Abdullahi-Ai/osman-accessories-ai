import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from app import RAGAssistant

assistant = RAGAssistant()
db = assistant.vector_db

query = "Do you offer screen protector installation?"
processed_query = assistant.process_query(query)
query_embedding = db.embedding_model.encode([processed_query]).tolist()
results = db.collection.query(
    query_embeddings=query_embedding,
    n_results=100,
)
for doc, meta, dist in zip(results["documents"][0], results["metadatas"][0], results["distances"][0]):
    if meta.get("source") == "services.txt":
        print(f"Dist: {dist:.4f} | Snippet: {doc[:80].replace(chr(10), ' ')}")
