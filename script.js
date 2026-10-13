/* =========================================================
   TEMPLATE DENTISTA — CLÍNICA — JavaScript
   ========================================================= */

/* ---- CONFIGURAÇÃO POR CLIENTE ---- */
const CONFIG = {
  whatsapp: "5511900000000",            // DDI + DDD + número (só dígitos)
  mensagem: "Olá! Vim pelo site e gostaria de agendar.",
  tempoCarrossel: 6000,
  /* Título de cada profissional: "f" = Dra.  |  "m" = Dr.
     Use data-titulo="f" ou data-titulo="m" no HTML, ao lado do nome. */
};

/* Gênero por profissional: lê data-titulo="f|m" e escreve Dra./Dr. */
document.querySelectorAll("[data-titulo]").forEach(el => el.textContent = el.dataset.titulo === "f" ? "Dra." : "Dr.");

/* Links de WhatsApp em todo [data-wpp] */
document.querySelectorAll("[data-wpp]").forEach(el => {
  el.href = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(CONFIG.mensagem)}`;
  el.target = "_blank"; el.rel = "noopener";
});

/* Menu mobile */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => { burger.classList.toggle("open"); menu.classList.toggle("open"); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); menu.classList.remove("open"); }));

/* Header sólido ao rolar */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* Animação de entrada ao rolar */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Contadores animados */
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, step = Math.max(1, end / 60); let n = 0;
  const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = Math.floor(n); if (n >= end) clearInterval(t); }, 25);
  co.unobserve(el);
}));
document.querySelectorAll("[data-count]").forEach(el => co.observe(el));

/* Carrossel de avaliações */
const slides = document.querySelectorAll(".slide"), dots = document.getElementById("dots"); let atual = 0, timer;
slides.forEach((_, i) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Avaliação " + (i + 1)); b.onclick = () => { ir(i); reiniciar(); }; dots.appendChild(b); });
function ir(i) { atual = i; slides.forEach((s, k) => s.classList.toggle("active", k === i)); dots.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === i)); }
function reiniciar() { clearInterval(timer); timer = setInterval(() => ir((atual + 1) % slides.length), CONFIG.tempoCarrossel); }
ir(0); reiniciar();

document.getElementById("year").textContent = new Date().getFullYear();
