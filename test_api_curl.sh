#!/bin/bash
# Start backend in the background
.venv/bin/uvicorn src.api:app --port 8000 &
PID=$!
sleep 5 # wait for startup

echo "Testing API..."
curl -X POST http://127.0.0.1:8000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "do you have samsung phone"}'

kill $PID
