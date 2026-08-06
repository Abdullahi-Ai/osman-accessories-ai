# Khalid & Osman Accessories - AI-Powered E-Commerce Platform

A premium, production-ready e-commerce platform for high-end electronics, paired with an advanced **RAG-powered AI Shopping Assistant**. This project demonstrates the seamless integration of a modern React frontend with a robust Python/FastAPI Artificial Intelligence backend.

## 📖 Project Overview: What We Built

We built a next-generation shopping experience designed to bridge the gap between digital storefronts and personalized customer service. The project consists of two core components:

1. **The Premium Storefront:** A highly responsive, secure, and visually stunning React application. Customers can browse flagship devices, filter by specifications, and check out directly via a secure WhatsApp integration. 
2. **The Osman AI Assistant:** Instead of a static FAQ page, we built a dynamic AI agent. Powered by a Retrieval-Augmented Generation (RAG) pipeline, the chatbot reads directly from the store's knowledge base (inventory, pricing, warranty policies) to provide real-time, highly accurate, and grounded answers to customer inquiries.

This architecture ensures a scalable, secure, and highly interactive user experience.

---

## 🚀 Key Features

* **AI-Powered Customer Support:** An intelligent, context-aware chatbot (Osman AI) powered by LangChain, ChromaDB, and the Groq API. It answers technical questions, compares products, and assists with warranties without hallucinating data.
* **Premium Visual Design:** A sophisticated Navy & Gold color palette featuring glassmorphism effects, smooth Framer Motion micro-animations, and high-end typography (Space Grotesk & Inter).
* **Robust Product Catalog:** A curated selection of flagship devices (Smartphones, Tablets, Smartwatches, Audio) complete with accurate market pricing, real specifications, and high-quality photorealistic imagery.
* **Security-Hardened Cart System:** A robust shopping cart built with React Context that validates product integrity against a trusted local catalogue, preventing client-side price tampering.
* **WhatsApp Checkout Integration:** A seamless checkout flow that automatically generates a formatted, secure WhatsApp message containing the user's order details and sanitized customer information.

---

## 🧠 System Architecture

The project strictly separates the client interface from the AI processing engine.

### 1. Frontend (Store UI)
* **Framework:** React.js 19, Vite
* **Styling:** Tailwind CSS 4, PostCSS
* **Routing:** React Router DOM (Security Patched)
* **Icons & Animation:** Lucide React, Framer Motion
* **Responsibility:** Renders the UI, manages the shopping cart state in `localStorage`, sanitizes user input, and securely communicates with the AI backend.

### 2. AI Backend (RAG Pipeline)
* **Framework:** FastAPI (Python)
* **Orchestration:** LangChain
* **Embeddings:** HuggingFace `sentence-transformers/all-MiniLM-L6-v2` (Local PyTorch Models)
* **Vector Database:** ChromaDB (`PersistentClient`)
* **LLM Provider:** Groq API (`llama-3.1-8b-instant`)
* **Responsibility:** Ingests local `.txt` documents on startup, chunks them into vector embeddings, performs semantic similarity searches against user queries, and constructs grounded prompts for the LLM to return accurate answers.

---

## 📦 Getting Started (Step-by-Step Guide)

To run the full application locally, you must run both the AI Backend (Python) and the Frontend (React) simultaneously in two separate terminal windows.

### Prerequisites
* Python 3.10+
* Node.js (v18+) & npm
* A [Groq API Key](https://console.groq.com/keys) (Free tier is sufficient)

---

### Step 1: Clone the Repository
First, clone the project to your local machine and navigate into the directory:
```bash
git clone https://github.com/Abdullahi-Ai/osman-accessories-ai.git
cd osman-accessories-ai
```

### Step 2: Start the AI Backend (Terminal 1)
The Python backend acts as the "brain" for the Osman AI chat widget. It must be running for the chatbot to answer queries.

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  
   ```
2. **Install the required Python packages:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure your API keys:**
   Copy the example environment file to create your own local configuration:
   ```bash
   cp .env.example .env
   ```
   *Open the `.env` file in your code editor and provide your Groq API key:*
   - `GROQ_API_KEY`: Required for the LLM.
   *(Note: Do not commit your `.env` file containing real tokens!)*

4. **Run the backend server:**
   ```bash
   ./start_backend.sh
   ```
   *(Alternatively, run `python -m uvicorn src.api:app --host 0.0.0.0 --port 8000`)*

The backend will now initialize the Vector Database (this takes a few seconds on the first run) and start on `http://localhost:8000`.

---

### Step 3: Start the Frontend Store (Terminal 2)
The React frontend powers the main e-commerce interface and the chat UI.

1. **Open a new terminal window** and navigate to the frontend directory:
   ```bash
   # From the project root directory:
   cd store
   ```
2. **Install the Node dependencies:**
   ```bash
   npm install
   ```
3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

**🎉 You are all set!** Open the `http://localhost:5173` URL provided by Vite in your browser to test the premium storefront and interact with the AI Assistant!

---
*Developed for Khalid & Osman Accessories — Redefining the premium shopping experience.*