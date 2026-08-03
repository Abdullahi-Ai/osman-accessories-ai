import sys
sys.path.append('src')
import traceback
from app import RAGAssistant, load_documents

try:
    print("Initializing...")
    assistant = RAGAssistant()
    print("Loading docs...")
    docs = load_documents()
    assistant.add_documents(docs)
    print("Invoking...")
    ans = assistant.invoke("i need samsung phone am osman")
    print(ans)
except Exception as e:
    traceback.print_exc()
