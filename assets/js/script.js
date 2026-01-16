const btn = document.getElementById("btn");
const perguntaEl = document.getElementById("pergunta");
const saida = document.getElementById("saida");

// URL do seu Cloudflare Worker
const API_URL = "https://ymarinho2025.workers.dev";

btn.addEventListener("click", async () => {
  const pergunta = perguntaEl.value.trim();
  if (!pergunta) return;

  saida.textContent = "Carregando...";

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      saida.textContent =
        "Erro: " + (data?.error || "desconhecido");
      return;
    }

    saida.textContent = data.resposta || "(sem resposta)";
  } catch (e) {
    saida.textContent = "Falha na requisição: " + e.message;
  }
});

// Enviar com ENTER
perguntaEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    btn.click();
  }
});
