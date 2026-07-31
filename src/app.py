import os
import logging
from typing import List

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from vectordb import VectorDB

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_documents() -> List[dict]:
    """
    Load all text documents from the data directory.

    Returns:
        List of document dictionaries containing content and metadata.
    """
    documents = []
    data_dir = "data"

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

        # TODO:
        # Load the production prompt from prompts/system_prompt.txt
        # and create the ChatPromptTemplate.
        self.prompt_template = None

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

        # TODO:
        # 1. Retrieve relevant chunks from ChromaDB.
        # 2. Build the context.
        # 3. Invoke the LangChain pipeline.
        # 4. Return the generated answer.

        return ""



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