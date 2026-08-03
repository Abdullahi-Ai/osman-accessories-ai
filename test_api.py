import asyncio
from src.api import chat_endpoint, ChatRequest, lifespan, app

async def run():
    async with lifespan(app):
        req = ChatRequest(message="i need samsung phone am osman")
        res = await chat_endpoint(req)
        print("RESPONSE:", res)

asyncio.run(run())
