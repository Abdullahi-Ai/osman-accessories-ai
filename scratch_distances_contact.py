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
    query_embedding = db.embedding_model.encode([processed_query]).tolist()
    # retrieve a large number of results so we can find the specific documents
    results = db.collection.query(
        query_embeddings=query_embedding,
        n_results=100,
    )
    print(f"\nQUERY: '{query}'")
    if results and results.get("documents") and results["documents"][0]:
        found_sources = set()
        for doc, meta, dist in zip(results["documents"][0], results["metadatas"][0], results["distances"][0]):
            source = meta.get('source')
            if source not in found_sources:
                print(f"  Best from {source}: Dist: {dist:.4f}")
                if source == "contact.txt" or source == "about.txt" or source == "policies.txt" or source == "services.txt" or source == "accessories.txt":
                    print(f"    Snippet: {doc[:60].replace(chr(10), ' ')}")
                found_sources.add(source)
