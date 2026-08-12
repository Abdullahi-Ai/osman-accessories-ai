import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from app import RAGAssistant

assistant = RAGAssistant()
db = assistant.vector_db

queries = [
    "Where is your shop located?",
    "What are your business hours?",
    "What is your mission statement?",
    "Do you accept M-Pesa?",
    "Do you offer screen protector installation?"
]

for query in queries:
    processed_query = assistant.process_query(query)
    # Get raw results bypassing search threshold
    query_embedding = db.embedding_model.encode([processed_query]).tolist()
    results = db.collection.query(
        query_embeddings=query_embedding,
        n_results=3,
    )
    print(f"\nQUERY: '{query}'")
    if results and results.get("documents") and results["documents"][0]:
        for doc, meta, dist in zip(results["documents"][0], results["metadatas"][0], results["distances"][0]):
            print(f"  Source: {meta.get('source')}")
            print(f"  Distance: {dist:.4f}")
            print(f"  Snippet: {doc[:60].replace(chr(10), ' ')}")
            print("-" * 20)
