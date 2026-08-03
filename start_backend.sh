#!/bin/bash
echo "Starting Osman AI Backend Server..."
echo "Running on http://0.0.0.0:8000 (accessible from other devices on your Wi-Fi)"
.venv/bin/uvicorn src.api:app --host 0.0.0.0 --port 8000
