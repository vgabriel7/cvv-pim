/* ===== script.js — JavaScript puro, sem bibliotecas =====
   Como se conecta: o HTML define a estrutura (ids e atributos aria-*),
   o CSS define o visual (classes como .aberto e .ativo) e este arquivo
   apenas liga/desliga esses estados quando a pessoa interage. */

/* ---------- 1. Menu mobile ---------- */
const botaoMenu = document.getElementById("menuBotao");
const menu = document.getElementById("menuPrincipal");

function alternarMenu() {
  // classList.toggle devolve true se a classe foi adicionada
  const aberto = menu.classList.toggle("aberto");
  // aria-expanded avisa leitores de tela se o menu está aberto
  botaoMenu.setAttribute("aria-expanded", String(aberto));
}

function fecharMenu() {
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", alternarMenu);

// Fecha o menu ao escolher um link ou ao apertar Esc
menu.addEventListener("click", (evento) => {
  if (evento.target.closest("a")) fecharMenu();
});
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharMenu();
});

/* ---------- 2. FAQ expansível ---------- */
// Cada pergunta é um <button>, então já funciona com Tab, Enter e Espaço.
function alternarResposta(botao) {
  const aberta = botao.getAttribute("aria-expanded") === "true";
  const resposta = document.getElementById(botao.getAttribute("aria-controls"));
  botao.setAttribute("aria-expanded", String(!aberta));
  resposta.hidden = aberta; // o atributo "hidden" esconde o elemento
}

document.querySelectorAll(".faq__pergunta").forEach((botao) => {
  botao.addEventListener("click", () => alternarResposta(botao));
});

/* ---------- 3. Destaque da seção atual no menu ---------- */
// IntersectionObserver avisa quando uma seção entra na área visível.
const linksMenu = document.querySelectorAll('.menu a[href^="#"]:not(.botao)');

function marcarSecaoAtiva(id) {
  linksMenu.forEach((link) => {
    const ativo = link.getAttribute("href") === "#" + id;
    link.classList.toggle("ativo", ativo);
    if (ativo) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) marcarSecaoAtiva(entrada.target.id);
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // considera a faixa central da tela
);

document.querySelectorAll("main section[id]").forEach((secao) => observador.observe(secao));

/* A rolagem suave está no CSS (scroll-behavior) e é desativada
   automaticamente para quem pede menos movimento (prefers-reduced-motion). */
