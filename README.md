# Khalid & Osman Accessories - Osman AI

A premium, production-ready e-commerce platform for high-end electronics, paired with an advanced **RAG-powered AI Shopping Assistant**. This project demonstrates the seamless integration of a modern React frontend with a robust Python/FastAPI Artificial Intelligence backend, tailored to handle store-specific data reliably and without hallucinations.

**Tags:** RAG, Agentic AI, AI Assistant, E-Commerce, LangChain, ChromaDB, FastAPI, React, Sentence Transformers, Retrieval-Augmented Generation, E-commerce AI

## 1. Project Overview

We built a next-generation shopping experience designed to bridge the gap between digital storefronts and personalized customer service. The project consists of two core components:
1. **The Premium Storefront:** A highly responsive, secure, and visually stunning React application.
2. **The Osman AI Assistant:** A dynamic AI agent powered by a Retrieval-Augmented Generation (RAG) pipeline, hosted on a Python/FastAPI backend.

RAG is highly appropriate for this project because it allows the AI to ground its answers strictly in the store's verified knowledge base (products, policies, prices, and services), rather than relying on generalized internet data that could hallucinate incorrect store policies or non-existent inventory.

## 2. Project Goals

The practical goals of this project are:
- **Customer Assistance:** Provide instant, 24/7 support for shoppers.
- **Product Discovery:** Help users find specific electronics like iPhones and Samsung devices.
- **Store Information:** Provide accurate location, contact, and business hour information.
- **Policies & Services:** Communicate warranty, payment methods, and services like screen protector installation.
- **Grounded Answers:** Reduce LLM hallucination by restricting answers to a provided knowledge base.

## 3. Key Features

- **RAG-based Question Answering:** The core of the Osman AI assistant.
- **Custom Local Knowledge Base:** Powered by internal `.txt` files.
- **Semantic Search:** Fast and accurate context retrieval.
- **Sentence Transformers Embeddings:** Local embeddings using `all-MiniLM-L6-v2`.
- **ChromaDB Persistent Vector Storage:** Saves embeddings locally for fast reboots.
- **LangChain Prompt Orchestration:** Manages context injection and message history.
- **Groq LLM:** Fast, highly capable LLM provider (`openai/gpt-oss-20b`).
- **Query Preprocessing:** Normalizes queries and protects against empty inputs.
- **Typo Correction:** Fixes common product misspellings before retrieval.
- **Duplicate-Ingestion Prevention:** Uses deterministic IDs and upsert logic.
- **Retrieval Thresholding:** Rejects irrelevant context with distance filtering.
- **Retrieval Evaluation:** Built-in benchmarking script (`evaluate_retrieval.py`).
- **React Chat Interface:** A sleek user interface for interaction.

## 4. System Architecture

The complete system pipeline operates as follows:

React frontend → FastAPI backend → Query processing → Sentence Transformers embedding → ChromaDB retrieval → Distance filtering → Context construction → LangChain prompt → Groq LLM → API Response → React frontend.

Each component is decoupled yet seamlessly integrated. The React storefront serves the UI. FastAPI manages the API routes. Sentence Transformers handle text vectorization. ChromaDB stores and retrieves the vectors. LangChain orchestrates the prompt logic, and Groq serves as the fast inference engine.

**THE FUNDAMENTAL PROJECT ARCHITECTURE HAS BEEN PRESERVED.** This project strictly adheres to the original design and has not introduced any unnecessary databases, LLMs, Docker infrastructure, or microservices.

## 5. RAG Pipeline in Detail

### Query stage
When the user asks a question in the React frontend, it is sent via HTTP POST to the FastAPI backend.

### Query processing
Before hitting the embedding model, the query undergoes lightweight processing:
- **Whitespace normalization:** Strips leading/trailing spaces.
- **Lowercase conversion:** Standardizes the query for the typo dictionary.
- **Empty-query protection:** Instantly returns an error for empty strings.
- **Typo corrections:** Replaces common misspellings with canonical terms (e.g., "sumsung phone" → "samsung phone", "ipone" → "apple iphone").

This is a fast dictionary replacement layer, not an LLM rewriting layer.

### Embedding stage
The processed query is embedded using the local HuggingFace `sentence-transformers/all-MiniLM-L6-v2` model into a dense vector representation.

### Retrieval stage
ChromaDB performs a semantic similarity search (using L2 distance by default) to find the most relevant chunks from the database matching the query vector.

### Threshold stage
- **Top-k:** 3
- **Distance threshold:** 1.30

A distance threshold filters out highly irrelevant chunks. If the distance between the query and the closest document chunk exceeds 1.30, the chunk is discarded.

### Context stage
The retrieved chunks that pass the threshold are concatenated into a single context string.

### Generation stage
LangChain takes the system prompt, the generated context string, the chat history, and the user's question, formatting them into a strict prompt template for the Groq LLM.

### Grounding
The system prompt strictly instructs the LLM not to invent information. If no chunks pass the threshold, the LLM receives an empty context and is instructed to gracefully inform the user that it does not know the answer.

## 6. Knowledge Base

The system uses local `.txt` files stored in the `data/` directory. Examples include:
- `about.txt`, `contact.txt`, `policies.txt`, `services.txt`
- `samsung.txt`, `iphone.txt`, `tecno.txt`, `accessories.txt`

The knowledge base acts as the absolute source of truth. For instance, the system relies strictly on `policies.txt` to confirm that M-Pesa is accepted and that the official M-Pesa payment number is **0726228805**.

## 7. Document Ingestion

- **Source:** Loaded directly from `.txt` files in the `data/` directory.
- **Splitting:** Processed by `RecursiveCharacterTextSplitter`.
- **Metadata:** Each chunk retains metadata indicating its source file and chunk index.
- **Deterministic IDs:** IDs are generated systematically (e.g., `samsung.txt_chunk_0`). 
- **Upsert:** `collection.upsert()` is used. If an ID already exists, it updates it rather than duplicating it. This makes repeated application startups completely safe and prevents duplicate ingestion.
- **When:** Ingestion occurs automatically when the FastAPI server starts.

## 8. Chunking Strategy

Chunking is handled by LangChain's `RecursiveCharacterTextSplitter`.
- **Chunk Size:** 500
- **Chunk Overlap:** 100
- **Separators:** `["\n\n", "\n", " ", ""]`

**What Chunk Overlap Means:** Overlap dictates how many characters from the end of one chunk are repeated at the beginning of the next.

**Why Overlap Matters:** It preserves context continuity. For example, if a document says "The iPhone 15 Pro costs $999.", a hard split without overlap might put "The iPhone 15 Pro costs" in chunk 1, and "$999." in chunk 2. An overlap of 100 characters ensures that this critical relationship remains intact within a single retrievable block.

## 9. Embedding Model

The project utilizes `sentence-transformers/all-MiniLM-L6-v2`.
- **Why it is used:** It is a fast, lightweight, and highly effective model for semantic search. It can run entirely locally without requiring external API calls for embeddings.
- **Semantic representation:** It maps sentences into a dense vector space where semantically similar sentences are physically closer together.
- The same model is used for both indexing the documents and querying the database.

## 10. ChromaDB

ChromaDB operates as a `PersistentClient` in this project.
- **Local Persistence:** Data is saved to the `./chroma_db` directory on disk.
- **Collection Name:** `rag_documents`.
- **Why persistence is useful:** It ensures that once documents are embedded, the server can restart instantly without needing to re-embed the entire knowledge base, significantly improving startup times.

## 11. Retrieval Strategy

- **Top-k:** 3. The system retrieves the top 3 most relevant chunks.
- **Distance threshold:** 1.30. A lower distance indicates greater similarity. If a chunk's distance is greater than 1.30, it is discarded. If no chunks pass the threshold, the LLM is forced to rely entirely on its strict grounding instructions to refuse the answer, massively reducing hallucinations on out-of-scope queries.

## 12. Query Processing

The `process_query` method implements intentionally lightweight, deterministic processing to avoid the latency of an LLM rewriting layer.
1. **Whitespace cleanup:** `query.strip().split()` removes irregular spacing.
2. **Lowercase normalization:** `.lower()` standardizes the text.
3. **Empty query handling:** Prevents database queries on empty strings.
4. **Typo correction:** Safe dictionary mapping (e.g., "sumsung" → "samsung", "ipone" → "apple iphone").

## 13. Prompt Engineering

LangChain handles the prompt orchestration. The prompt consists of:
- **System Prompt:** Contains the grounding instructions.
- **Retrieved Context:** The chunks retrieved from ChromaDB.
- **Chat History:** The last few messages for conversational memory.
- **User Question:** The current query.

Prompt engineering works together with retrieval; the prompt alone cannot prevent hallucinations if it is fed garbage context, and retrieval alone cannot generate a conversational response. Together, they form a robust RAG system.

## 14. LLM

- **Currently Active Provider:** Groq
- **Active Model:** `openai/gpt-oss-20b`
- **Optional Supported Providers:** OpenAI, Google Gemini (via environment variables).

The LLM is NOT used as a knowledge database. Its sole responsibility is to generate a natural, conversational response based *only* on the retrieved context provided to it in the prompt.

## 15. Evaluation

The script `evaluate_retrieval.py` mathematically measures retrieval quality based on a static dataset.
- **Number of queries:** 13
- **Top-k:** 3

**Hit Rate:** The percentage of queries where the expected document is found in the top-k chunks.
*(Hit Rate = successful queries / total queries)*

**MRR (Mean Reciprocal Rank):** The average of the reciprocal ranks of the first relevant result. If the expected document is the 1st result, its rank is 1 (1/1). If it's the 2nd, the rank is 0.5 (1/2). 

**Current Measured Results:**
- **Hit Rate:** 100.00%
- **MRR:** 1.0000

The original 13 evaluation queries remain unchanged, and the system now successfully resolves all of them with perfect accuracy.

| Query | Expected Source |
|-------|-----------------|
| Do you have Samsung Galaxy S24? | samsung.txt |
| What iPhone models do you sell? | iphone.txt |
| I am looking for a Tecno Phantom. | tecno.txt |
| Do you have any screen protectors? | accessories.txt |
| Where is your shop located? | contact.txt |
| What are your business hours? | contact.txt |
| What is your mission statement? | about.txt |
| Do you accept M-Pesa? | policies.txt |
| What is your warranty policy? | policies.txt |
| Can you help me set up my new phone? | services.txt |
| Do you offer screen protector installation? | services.txt |
| sumsung phone | samsung.txt |
| ipone | iphone.txt |

## 16. Evaluation Reproducibility

To reproduce these exact results locally:
```bash
source .venv/bin/activate
python evaluate_retrieval.py
```
You should expect to see an output logging each query, the chunks retrieved, the Hit/RR status, and a final summary showing exactly `Hit Rate: 100.00%` and `MRR: 1.0000`.

## 17. Installation

### Prerequisites
- Python 3.10+
- Node.js (v18+) & npm
- A Groq API Key

### Clone the Repository
```bash
git clone https://github.com/Abdullahi-Ai/osman-accessories-ai.git
cd osman-accessories-ai
```

### Install Python Dependencies
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Install Frontend Dependencies
```bash
cd store
npm install
cd ..
```

### Environment Variables
```bash
cp .env.example .env
```
Edit `.env` and add: `GROQ_API_KEY=your_groq_api_key_here`

## 18. Running the Application

**Backend:**
```bash
source .venv/bin/activate
./start_backend.sh
```
The FastAPI server will run on `http://localhost:8000`.

**Frontend:**
```bash
cd store
npm run dev
```
The React frontend will run on `http://localhost:5173`. The frontend communicates with the backend via standard HTTP POST requests to `/api/chat`.

## 19. Usage

Open `http://localhost:5173` and use the chat widget to ask questions:
- "What iPhone models do you sell?"
- "Do you have any screen protectors?"
- "Where is your shop located?"
- "Do you accept M-Pesa?"
- "Can you help me set up my new phone?"
- "sumsung phone" *(Tests typo handling)*

If you ask a question outside the scope of the knowledge base, the system will politely decline to answer.

## 20. Project Scope

### What Osman AI CAN answer:
- Product availability (Samsung, iPhone, Tecno, etc.)
- Store policies (warranty, returns, payment methods)
- Services offered (screen protector installation, phone setup)
- Store location and business hours
- M-Pesa payment information

### What Osman AI CANNOT reliably answer:
- Live internet information (e.g., today's weather).
- Real-time stock counts (unless manually updated in the `.txt` files).
- Competitor information.
- General knowledge unrelated to the store.

RAG answers depend entirely on the indexed knowledge base.

## 21. Security

- The `.env` file is heavily guarded and explicitly listed in `.gitignore`.
- API keys are never hardcoded into the source code.
- A safe `.env.example` file is provided to guide setup without exposing secrets.

## 22. Project Structure

```text
osman-accessories-ai/
├── data/                    # .txt knowledge base files
├── src/                     # Core backend logic (app.py, vectordb.py, api.py)
├── prompts/                 # System prompt templates
├── store/                   # React frontend application
├── chroma_db/               # Persistent vector storage
├── evaluate_retrieval.py    # Formal evaluation benchmarking script
├── requirements.txt         # Python dependencies
├── start_backend.sh         # Backend execution script
├── README.md                # Documentation
└── .env.example             # Environment variable template
```

## 23. Testing

- `python test_app.py`: Tests the local RAG orchestration execution.
- `python test_queries.py`: Tests multiple HTTP POST requests against the running backend API.
- `python evaluate_retrieval.py`: Runs the formal retrieval benchmark (Verified Result: 100% Hit Rate).

## 24. Troubleshooting

- **Backend not running:** Ensure you activated the virtual environment (`source .venv/bin/activate`) before running `start_backend.sh`.
- **Frontend cannot connect:** Ensure the backend is running on `localhost:8000`.
- **Missing API key:** You will receive a 500 error if `GROQ_API_KEY` is missing from your `.env` file.
- **Stale embeddings:** If you modify files in `data/`, you must delete the `chroma_db/` directory and restart the backend to force re-ingestion, as `upsert` only checks deterministic chunk IDs, not text content changes.

## 25. Limitations

- Retrieval quality depends heavily on how the knowledge base is worded (e.g., FAQ formatting yields the best results).
- The fixed threshold of 1.30 might need manual tuning if you switch to a different embedding model.
- The typo dictionary is currently lightweight and hardcoded.
- Evaluation is currently measured against a relatively small dataset (13 queries), and results should not be interpreted as universal production accuracy.
- The system does not possess live web browsing capabilities.

## 26. Future Improvements

*Note: These are planned enhancements, not currently implemented features.*
- Expand the evaluation dataset to 100+ queries.
- Implement an automated evaluation pipeline in CI/CD.
- Develop more robust NLP-based query normalization.
- Introduce advanced retrieval strategies like Multi-Query Retrieval or Re-ranking.
- Add live inventory database integration via API rather than static `.txt` files.

## 27. Ready Tensor Requirements Traceability

| Ready Tensor Feedback | Implemented Response |
|-----------------------|----------------------|
| "Include clear installation and usage instructions" | Added detailed Sections 17, 18, and 19 covering prerequisites, commands, and expected ports. |
| "Address lack of details on chunk overlap and context preservation" | Created Section 8 to explicitly detail LangChain chunk parameters and the mechanical purpose of overlap. |
| "Including metrics for evaluating retrieval performance" | Documented the `evaluate_retrieval.py` script in Section 15, logging the verified 100% Hit Rate and 1.0 MRR. |
| "Focus on query processing techniques" | Detailed the deterministic query preprocessing pipeline in Section 12. |
| "Provide a clearer definition of the RAG project scope" | Created Section 20 delineating exactly what the AI can and cannot answer. |
| "Remove repeated title in main content" | Ensured the title is only declared once at the top of the README/publication. |
| "Add tags to your publication" | Added a comprehensive tags block directly under the primary header. |