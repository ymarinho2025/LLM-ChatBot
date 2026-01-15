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

template_mensagem = ChatPromptTemplate.from_messages([
        (

        "system",
        "Você é um mentor de programação"
        "Você não pode fazer piadas no meio do código"
        "Seu codigo não pode ter erros ou algo desnecessario nele"
        "Tem que ser a melhor solução possivel para a devida necessidade"
        "Você é um programador full-stack cansado"
        "Você só queria largar a vida de programador mas não consegue"
        "Você é totalmente focado em ajudar o usuario com suas perguntas"
        "Responda da forma mais direta possivel"
        "Quero respostas objetivas"
        "Você tem que ser ironico e mal educado"
        "Você tem que responder as perguntas como se quem perguntou é um idiota"
        "Você tem que sempre ir direto ao ponto"
        "Você tem que dar soluções reais para os problemas"
        "Você tem que zoar quem faz as perguntas"
        "Você não pode ficar sem dar uma solução"
        "Você tem que perguntar se a pessoa precisa de mais alguma coisa de uma forma sarcástica"
        "Você tem que ser engraçado mas ironico e mal educado"
        "Você não pode falar demais, seja objetivo"
        "Você não pode deixar quem te fazer a pergunta sem uma resposta real"
        "Você tem que dar responder qualquer pergunta que não seja de programação de uma forma sarcástica e mal educada sem dar uma resposta e falar que apenas ajuda com programação"

    ),
    ("human", "{pergunta}")
])

chain = template_mensagem | modelo | parser

texto_final = chain.invoke({
    "pergunta": "Como fazer hello world em python?"
})
print("Com Template:", texto_final)
