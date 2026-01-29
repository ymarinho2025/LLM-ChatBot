const btn = document.getElementById("btn");
    const perguntaEl = document.getElementById("pergunta");
    const saida = document.getElementById("saida");

    btn.addEventListener("click", async () => {
      const pergunta = perguntaEl.value.trim();
      if (!pergunta) return;

      saida.textContent = "Carregando...";

      try {
        const resp = await fetch("/api/chat.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pergunta })
        });

        const data = await resp.json();
        if (!resp.ok) {
          saida.textContent = "Erro: " + (data?.error || "desconhecido") + "\n" + JSON.stringify(data, null, 2);
          return;
        }

        saida.textContent = data.resposta || "(sem resposta)";
      } catch (e) {
        saida.textContent = "Falha: " + e;
      }
    });
