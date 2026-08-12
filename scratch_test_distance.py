import sys
sys.path.append('src')
from vectordb import VectorDB
import os

db = VectorDB()
q1 = "I need a samsung phone"
q2 = "Tell me about something unrelated to the store like airplanes"

r1 = db.search(q1, n_results=3)
r2 = db.search(q2, n_results=3)

print("Q1 Distances:", r1.get('distances', []))
print("Q2 Distances:", r2.get('distances', []))
