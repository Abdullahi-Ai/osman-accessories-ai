import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.app import RAGAssistant, load_documents

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


assistant = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global assistant
    logger.info("Starting up RAG API...")
    try:
        assistant = RAGAssistant()
        documents = load_documents()
        assistant.add_documents(documents)
        logger.info("RAG Assistant initialized and documents loaded.")
    except Exception as e:
        logger.error(f"Failed to initialize assistant or load documents: {e}")
    
    yield
    logger.info("Shutting down RAG API...")

app = FastAPI(title="Osman AI API", lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    global assistant
    if assistant is None:
        raise HTTPException(status_code=500, detail="RAG Assistant is not initialized.")
    
    try:
        answer = assistant.invoke(request.message)
        return ChatResponse(reply=answer)
    except Exception as e:
        logger.exception("Error during chat:")
        return ChatResponse(reply="I'm sorry, I encountered an error while processing your request. Please try again.")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "assistant_ready": assistant is not None}
