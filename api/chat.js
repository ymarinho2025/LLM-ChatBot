export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const { pergunta } = req.body || {};
    if (!pergunta) return res.status(400).json({ error: "Faltou 'pergunta'." });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENROUTER_API_KEY não configurada." });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // opcionais, mas úteis:
        "HTTP-Referer": "https://seu-dominio.vercel.app",
        "X-Title": "Meu Chat Vercel"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content:
              "Você é um mentor de programação. Responda com objetividade e foco técnico. Sem piadas no meio do código."
          },
          { role: "user", content: pergunta }
        ]
      })
    });

    const data = await response.json();

    // resposta padrão OpenAI-like
    const texto = data?.choices?.[0]?.message?.content ?? null;

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro do OpenRouter",
        details: data
      });
    }

    return res.status(200).json({ resposta: texto });
  } catch (err) {
    return res.status(500).json({ error: "Falha interna", details: String(err) });
  }
}
