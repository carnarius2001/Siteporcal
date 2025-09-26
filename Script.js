// -------- PERFIL --------
function carregarPerfil() {
  let nome = localStorage.getItem("nomePerfil") || "Jogador";
  let foto = localStorage.getItem("fotoPerfil") || "perfil1.jpg";
  let moedas = localStorage.getItem("moedas") || 0;
  let inventario = JSON.parse(localStorage.getItem("inventario")) || {};
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let nivel = parseInt(localStorage.getItem("nivel")) || 1;

  if (document.getElementById("nomePerfil")) {
    document.getElementById("nomePerfil").innerText = nome;
  }
  if (document.getElementById("fotoPerfil")) {
    document.getElementById("fotoPerfil").src = foto;
  }
  if (document.getElementById("moedas")) {
    document.getElementById("moedas").innerText = moedas;
  }
  if (document.getElementById("nivel")) {
    document.getElementById("nivel").innerText = nivel;
  }
  if (document.getElementById("xpAtual")) {
    document.getElementById("xpAtual").innerText = xp + "/100";
  }
  if (document.getElementById("xpBarra")) {
    document.getElementById("xpBarra").style.width = xp + "%";
  }

  if (document.getElementById("itensComprados")) {
    const container = document.getElementById("itensComprados");
    container.innerHTML = "";
    let keys = Object.keys(inventario);
    if (keys.length === 0) {
      container.innerHTML = "<p>Nenhum item comprado ainda!</p>";
    } else {
      keys.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
          <span>${item}</span>
          <span>x${inventario[item]}</span>
        `;
        container.appendChild(div);
      });
    }
  }
}

// -------- XP E NÍVEL --------
function adicionarXP(valor) {
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let nivel = parseInt(localStorage.getItem("nivel")) || 1;

  xp += valor;
  if (xp >= 100) {
    xp -= 100;
    nivel++;
    alert("Parabéns! Você subiu para o nível " + nivel);
  }

  localStorage.setItem("xp", xp);
  localStorage.setItem("nivel", nivel);

  carregarPerfil();
}

// -------- FOTO --------
function mudarFoto(foto) {
  localStorage.setItem("fotoPerfil", foto);
  if (document.getElementById("fotoPerfil")) {
    document.getElementById("fotoPerfil").src = foto;
  }
  if (document.getElementById("opcoesFoto")) {
    document.getElementById("opcoesFoto").style.display = "none";
  }
}

// -------- RESET --------
function resetarPerfil() {
  if (confirm("Tem certeza que deseja resetar tudo?")) {
    localStorage.clear();
    carregarPerfil();
  }
}
window.onload = carregarPerfil;
// Abrir seletor de arquivos ao clicar no botão
document.getElementById("btnUploadFoto").addEventListener("click", () => {
  document.getElementById("uploadInput").click();
});

// Quando o usuário escolhe uma imagem ou gif
document.getElementById("uploadInput").addEventListener("change", (event) => {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const url = e.target.result;
    // trocar a foto do perfil
    document.getElementById("fotoPerfil").src = url;
    // salvar no localStorage
    localStorage.setItem("fotoPerfil", url);
  };
  reader.readAsDataURL(arquivo); // transforma em base64
});
ativarConquistaGlobal("🏆 Você ganhou 50 moedas!");
function ativarConquistaGlobal(msg) {
  localStorage.setItem("conquistaMsg", msg);
}

// em TODAS as páginas
window.addEventListener("storage", (e)=>{
  if (e.key === "conquistaMsg" && e.newValue) {
    mostrarConquista(e.newValue);
    localStorage.removeItem("conquistaMsg");
  }
});