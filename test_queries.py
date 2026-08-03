import requests

queries = [
    "Do you have Samsung phones?",
    "Show me Samsung phones under KES 50,000.",
    "Compare Samsung A36 and Samsung A56.",
    "What services do you offer?",
    "What is your warranty policy?",
    "Where is your shop located?"
]

for q in queries:
    res = requests.post("http://127.0.0.1:8000/api/chat", json={"message": q})
    print(f"Q: {q}")
    print(f"A: {res.json().get('reply')}\n")
