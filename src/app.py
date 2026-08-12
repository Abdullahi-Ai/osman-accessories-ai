import os
import logging
from typing import List

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from src.vectordb import VectorDB


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_documents() -> List[dict]:
    """
    Load all text documents from the data directory.

    Returns:
        List of document dictionaries containing content and metadata.
    """
    documents = []
    data_dir = os.path.join(BASE_DIR, "data")

    for filename in os.listdir(data_dir):
        if filename.endswith(".txt"):
            filepath = os.path.join(data_dir, filename)

            with open(filepath, "r", encoding="utf-8") as file:
                content = file.read()

            documents.append(
                {
                    "content": content,
                    "metadata": {
                        "source": filename,
                    },
                }
            )

    return documents


class RAGAssistant:
    """
    Retrieval-Augmented Generation (RAG) assistant using
    ChromaDB and multiple LLM providers.
    """

    def __init__(self):
        """Initialize the RAG assistant."""

        self.llm = self._initialize_llm()

        self.vector_db = VectorDB()

        self.chat_history = []

        prompt_path = os.path.join(BASE_DIR, "prompts", "system_prompt.txt")
        with open(prompt_path, "r", encoding="utf-8") as f:
            system_prompt = f.read()

        self.prompt_template = ChatPromptTemplate.from_messages([
            ("system", system_prompt + "\n\nRetrieved Context:\n{context}"),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{question}")
        ])

        if self.prompt_template is not None:
            self.chain = (
                self.prompt_template
                | self.llm
                | StrOutputParser()
            )
        else:
            self.chain = None

        logger.info("RAG Assistant initialized successfully.")

    def _initialize_llm(self):
        """
        Initialize the available language model.

        Priority:
        1. OpenAI
        2. Groq
        3. Google Gemini
        """

        if os.getenv("OPENAI_API_KEY"):

            model_name = os.getenv(
                "OPENAI_MODEL",
                "gpt-4o-mini",
            )

            logger.info("Using OpenAI model: %s", model_name)

            return ChatOpenAI(
                api_key=os.getenv("OPENAI_API_KEY"),
                model=model_name,
                temperature=0.0,
            )

        if os.getenv("GROQ_API_KEY"):

            model_name = os.getenv(
                "GROQ_MODEL",
                "llama-3.1-8b-instant",
            )

            logger.info("Using Groq model: %s", model_name)

            return ChatGroq(
                api_key=os.getenv("GROQ_API_KEY"),
                model=model_name,
                temperature=0.0,
            )

        if os.getenv("GOOGLE_API_KEY"):

            model_name = os.getenv(
                "GOOGLE_MODEL",
                "gemini-2.0-flash",
            )

            logger.info("Using Gemini model: %s", model_name)

            return ChatGoogleGenerativeAI(
                google_api_key=os.getenv("GOOGLE_API_KEY"),
                model=model_name,
                temperature=0.0,
            )

        raise ValueError(
            "No API key found. Configure one of: "
            "OPENAI_API_KEY, GROQ_API_KEY, or GOOGLE_API_KEY."
        )

    def add_documents(self, documents: List) -> None:
        """
        Add documents to the knowledge base.
        """
        self.vector_db.add_documents(documents)

    def process_query(self, query: str) -> str:
        """
        Normalize and process the user query to improve retrieval.
        - Normalize whitespace and case.
        - Handle common misspellings.
        """
        if not query:
            return ""
        
        query = " ".join(query.strip().split()).lower()
        
        replacements = {
            "sumsung": "samsung",
            "ipone": "apple iphone",
            "iphone": "apple iphone",
        }
        
        for k, v in replacements.items():
            query = query.replace(k, v)
            
        return query

    def invoke(
        self,
        question: str,
        n_results: int = 3,
    ) -> str:
        """
        Query the RAG assistant.

        Args:
            question: User question.
            n_results: Number of relevant chunks to retrieve.

        Returns:
            AI-generated response.
        """
        if not question or not question.strip():
            return "Please ask a valid question."

        processed_query = self.process_query(question)

        results = self.vector_db.search(query=processed_query, n_results=n_results)
        
        context = ""
        if results and results.get("documents") and results["documents"]:
            
            
            retrieved_chunks = results["documents"][0]
            context = "\n\n".join(retrieved_chunks)

        if self.chain:
            response = self.chain.invoke({
                "context": context,
                "chat_history": self.chat_history,
                "question": question
            })
            
            self.chat_history.append(HumanMessage(content=question))
            self.chat_history.append(AIMessage(content=response))
            
            
            if len(self.chat_history) > 10:
                self.chat_history = self.chat_history[-10:]
                
            return response
        else:
            return "LangChain pipeline is not initialized."



def main():
    """Run the RAG assistant."""

    try:

        logger.info("Initializing RAG Assistant...")

        assistant = RAGAssistant()

        logger.info("Loading documents...")

        documents = load_documents()

        logger.info(
            "Loaded %d documents.",
            len(documents),
        )

        assistant.add_documents(documents)

        while True:

            question = input(
                "\nAsk a question (or type 'quit'): "
            )

            if question.lower() == "quit":
                break

            answer = assistant.invoke(question)

            print("\nAssistant:")
            print(answer)

    except Exception as error:

        logger.error(error)

        logger.info(
            "Configure one of the following API keys:"
        )

        logger.info("- OPENAI_API_KEY")
        logger.info("- GROQ_API_KEY")
        logger.info("- GOOGLE_API_KEY")


if __name__ == "__main__":
    main()