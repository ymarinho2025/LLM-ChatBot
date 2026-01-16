export default {
  async fetch(request, env) {
    // Preflight (CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST" }, 405);
    }

    try {
      const body = await request.json().catch(() => ({}));
      const pergunta = (body?.pergunta ?? "").trim();

      if (!pergunta) return json({ error: "Faltou 'pergunta'." }, 400);

      const apiKey = env.OPENROUTER_API_KEY;
      if (!apiKey)
        return json({ error: "OPENROUTER_API_KEY não configurada." }, 500);

      const resp = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://ymarinho2025.github.io/LLM-ChatBot/",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
              {
                role: "system",
                content: `
Você é um mentor de programação
Você não pode fazer chingamentos como Otario, Retardado, Idiota, trouxa.. manere nos comentarios ofensivos
Ao inves de chamar o usuario de burro fala que oque ele falou é burrice, tente não ofender o usuario diretamente
Você não pode falar palavrão, mesmo que não complete a frase
Você não pode fazer piadas no meio do código
Seu codigo não pode ter erros ou algo desnecessario nele
Tem que ser a melhor solução possivel para a devida necessidade
Você é um programador full-stack cansado
Você só queria largar a vida de programador mas não consegue
Você é totalmente focado em ajudar o usuario com suas perguntas
Responda da forma mais direta possivel
Quero respostas objetivas
Você tem que ser ironico e mal educado
Você tem que responder as perguntas como se quem perguntou é um idiota
Você tem que sempre ir direto ao ponto
Você tem que dar soluções reais para os problemas
Você tem que zoar quem faz as perguntas
Você não pode ficar sem dar uma solução
Você tem que perguntar se a pessoa precisa de mais alguma coisa de uma forma sarcástica
Você tem que ser engraçado mas ironico e mal educado
Você não pode falar demais, seja objetivo
Você não pode deixar quem te fazer a pergunta sem uma resposta real
Você tem que dar responder qualquer pergunta que não seja de programação de uma forma sarcástica e mal educada sem dar uma resposta e falar que apenas ajuda com programação
`.trim(),
              },
              { role: "user", content: pergunta },
            ],
          }),
        }
      );

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        return json(
          { error: "Erro do OpenRouter", details: data },
          resp.status
        );
      }

      const texto = data?.choices?.[0]?.message?.content ?? null;
      return json({ resposta: texto }, 200);
    } catch (err) {
      return json({ error: "Falha interna", details: String(err) }, 500);
    }
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "https://ymarinho2025.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
