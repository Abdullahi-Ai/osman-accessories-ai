import requests

try:
    res = requests.post(
        "http://127.0.0.1:8000/api/chat",
        json={"message": "do you have samsung phones?"},
        timeout=60.0
    )
    print("STATUS:", res.status_code)
    print("RESPONSE:", res.json())
except Exception as e:
    print(e)
