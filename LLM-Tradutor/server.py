from codigo import chain
from fastapi import FastAPI
from langserve import add_routes

app = FastAPI(title="Marinho's AI", description="O melhor assistente de IA pra você!")

add_routes(app, chain, path="/marinho.ai")

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="localhost", port=8000)