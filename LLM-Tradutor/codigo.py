from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()
chave_api = os.getenv("API_KEY") 

modelo = ChatOpenAI(
    model="deepseek/deepseek-r1-0528:free",
    api_key=chave_api,
    base_url="https://openrouter.ai/api/v1",
)

parser = StrOutputParser()

mensagens = [
    SystemMessage(content="Traduza o texto a seguir para inglês."),
    HumanMessage(content="O fluxo de seu codigo está otimo!"),
]
resposta_direta = modelo.invoke(mensagens)
print("Direto:", resposta_direta.content)

template_mensagem = ChatPromptTemplate.from_messages([
    ("system", "Traduza o texto a seguir para {idioma}. Responda apenas com a tradução final."),
    ("human", "{texto}")
])

chain = template_mensagem | modelo | parser

texto_final = chain.invoke({
    "idioma": "inglês",
    "texto": "Olá, sou seu assistente de IA."
})
print("Com Template:", texto_final)
