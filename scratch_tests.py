import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from app import RAGAssistant

print("Testing RAG Assistant Queries...")
assistant = RAGAssistant()
# This triggers load and upsert in ChromaDB (duplicate ingestion check)
from app import load_documents
assistant.add_documents(load_documents())

queries = [
    "I need a Samsung phone",
    "Do you have an iPhone?",
    "I need a Tecno phone",
    "Do you sell accessories?",
    "what is your contact",
    "sumsung phone",
    "   ", # Empty query
    "Tell me about something unrelated to the store",
]

for q in queries:
    print(f"\n--- Query: '{q}' ---")
    ans = assistant.invoke(q)
    print("Answer:", ans[:200] + ("..." if len(ans) > 200 else ""))

print("\nFinished testing.")
