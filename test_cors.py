import requests

try:
    res = requests.options("http://127.0.0.1:8000/api/chat", headers={
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type"
    })
    print("OPTIONS STATUS:", res.status_code)
    print("OPTIONS HEADERS:", res.headers)
except Exception as e:
    print(e)
