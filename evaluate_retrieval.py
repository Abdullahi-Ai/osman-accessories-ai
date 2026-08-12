import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from vectordb import VectorDB
from app import RAGAssistant

def evaluate():
    print("Initializing RAG Assistant for evaluation...")
    assistant = RAGAssistant()
    db = assistant.vector_db

    eval_dataset = [
        ("Do you have Samsung Galaxy S24?", "samsung.txt"),
        ("What iPhone models do you sell?", "iphone.txt"),
        ("I am looking for a Tecno Phantom.", "tecno.txt"),
        ("Do you have any screen protectors?", "accessories.txt"),
        ("Where is your shop located?", "contact.txt"),
        ("What are your business hours?", "contact.txt"),
        ("What is your mission statement?", "about.txt"),
        ("Do you accept M-Pesa?", "policies.txt"),
        ("What is your warranty policy?", "policies.txt"),
        ("Can you help me set up my new phone?", "services.txt"),
        ("Do you offer screen protector installation?", "services.txt"),
        ("sumsung phone", "samsung.txt"),
        ("ipone", "iphone.txt")
    ]

    total_queries = len(eval_dataset)
    hits = 0
    mrr_sum = 0.0

    print("\n--- Running Evaluation ---")
    
    for query, expected_source in eval_dataset:
        processed_query = assistant.process_query(query)
        results = db.search(query=processed_query, n_results=3)
        
        retrieved_sources = []
        if results and results.get("metadatas") and results["metadatas"][0]:
            retrieved_sources = [meta.get("source") for meta in results["metadatas"][0]]
        
        hit = False
        reciprocal_rank = 0.0
        
        for rank, source in enumerate(retrieved_sources, start=1):
            if source == expected_source:
                hit = True
                reciprocal_rank = 1.0 / rank
                break
                
        if hit:
            hits += 1
        mrr_sum += reciprocal_rank
        
        print(f"Query: '{query}'")
        print(f"Expected: {expected_source} | Retrieved: {retrieved_sources}")
        print(f"Hit: {hit} | RR: {reciprocal_rank:.2f}\n")

    hit_rate = hits / total_queries
    mrr = mrr_sum / total_queries

    print("--- Evaluation Results ---")
    print(f"Total Queries: {total_queries}")
    print(f"Hit Rate: {hit_rate:.2%} (Percentage of queries where expected source was in top k)")
    print(f"MRR: {mrr:.4f} (Mean Reciprocal Rank - average of 1/rank of first correct hit)")

if __name__ == "__main__":
    evaluate()
