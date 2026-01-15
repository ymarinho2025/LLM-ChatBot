from langserve import RemoteRunnable

chain_remota = RemoteRunnable("http://localhost:8000/marinho.ai/playground/")
texto = chain_remota.invoke({"idioma": "inglês", "texto": "Olá, sou seu assistente de IA."})
print(texto)