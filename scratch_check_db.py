import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from app import RAGAssistant
assistant = RAGAssistant()
db = assistant.vector_db

queries = ["Where is your shop located?", "What are your business hours?"]
for q in queries:
    res = db.search(q, n_results=5, distance_threshold=2.0)
    print(f"Query: {q}")
    for doc, meta, dist in zip(res['documents'][0], res['metadatas'][0], res['distances'][0]):
        print(f"  Dist: {dist:.4f} | Source: {meta.get('source')}")
