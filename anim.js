/* =============================================================
   CONFIGURACIÓN — edita solo esta parte
   ============================================================= */

const CONFIG = {
  // 1) Pon tu canción en la carpeta "sound" y escribe aquí su nombre.
  //    Lo más fácil: renombra tu archivo a "cancion.mp3" y no toques nada.
  cancion: "sound/cancion.mp3",

  // 2) Segundo en el que el mensaje grande se desvanece.
  ocultarTituloEn: 26,

  // 3) Segundos que permanece en pantalla cada frase.
  duracionFrase: 7,
};

/* Frases que aparecen sobre las flores.
   "time" es el segundo de la canción en el que aparece cada una.
   Cámbialas por lo que quieras decirle. */
const FRASES = [
  { text: "Hay flores que duran una semana", time: 8 },
  { text: "y flores que duran lo que dure esta canción", time: 16 },
  { text: "Estas son de las segundas", time: 24 },
  { text: "Un lirio, porque eres elegante sin proponértelo", time: 34 },
  { text: "Un lirio araña, porque también tienes fuego", time: 44 },
  { text: "Una dalia, por todas tus capas", time: 54 },
  { text: "Una orquídea, porque eres difícil de encontrar", time: 64 },
  { text: "Un loto, porque floreces incluso en los días grises", time: 74 },
  { text: "Y yo aquí, mirándote florecer", time: 86 },
  { text: "Gracias por existir", time: 96 },
];

/* =============================================================
   De aquí para abajo no hace falta tocar nada
   ============================================================= */

const audio = document.querySelector("#song");
const lyrics = document.querySelector("#lyrics");
const playBtn = document.querySelector("#play-btn");
const titulo = document.querySelector(".titulo");

if (audio && CONFIG.cancion) audio.src = CONFIG.cancion;

/* --- Reloj: el de la canción o, si no hay canción, uno de respaldo --- */
let usarRespaldo = !audio;
let t0 = null;

function tiempoActual() {
  if (!usarRespaldo) return audio.currentTime;
  return t0 === null ? 0 : (performance.now() - t0) / 1000;
}

function activarRespaldo() {
  if (usarRespaldo && t0 !== null) return;
  usarRespaldo = true;
  t0 = performance.now();
  if (playBtn) playBtn.classList.remove("is-visible");
  setInterval(tick, 250);
}

/* --- Frases sincronizadas --- */
let fraseActual;

function tick() {
  const t = tiempoActual();

  const frase = FRASES.find(
    (f) => t >= f.time && t < f.time + CONFIG.duracionFrase
  );
  if (frase !== fraseActual) {
    fraseActual = frase;
    if (frase) {
      lyrics.innerHTML = frase.text;
      lyrics.style.opacity = 1;
    } else {
      lyrics.style.opacity = 0;
    }
  }

  if (t >= CONFIG.ocultarTituloEn) ocultarTitulo();
}

/* --- Desvanecer el mensaje grande --- */
let tituloOculto = false;

function ocultarTitulo() {
  if (tituloOculto || !titulo) return;
  tituloOculto = true;
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(() => (titulo.style.display = "none"), 3000);
}

/* --- Reproducir; si el navegador lo bloquea, mostramos el botón --- */
function intentarReproducir() {
  if (!audio) return activarRespaldo();

  const promesa = audio.play();
  if (promesa !== undefined) {
    promesa
      .then(() => playBtn && playBtn.classList.remove("is-visible"))
      .catch(() => playBtn && playBtn.classList.add("is-visible"));
  }
}

if (audio) {
  audio.addEventListener("timeupdate", tick);
  // si el archivo no existe o el formato no se soporta, seguimos sin música
  audio.addEventListener("error", activarRespaldo);
}

if (playBtn) {
  playBtn.addEventListener("click", () => {
    audio.play();
    playBtn.classList.remove("is-visible");
  });
}

window.addEventListener("load", intentarReproducir);
