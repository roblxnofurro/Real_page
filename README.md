# 🌸 Ramo de flores animado — HTML, CSS y JS

Versión modificada del proyecto original. Ahora el ramo tiene **12 flores**:
2 o 3 de cada uno de estos cinco tipos, en cuatro tonos de color.

| Tipo | Cuántas | Tonos que aparecen |
|------|---------|---------------------|
| Lirio | 3 | rosa, lila, morado |
| Lirio araña (*Lycoris radiata*) | 2 | rojo, morado |
| Dalia | 2 | lila, rojo |
| Orquídea | 2 | rosa, lila |
| Flor de loto | 3 | morado, rosa, rojo |

Todo está hecho con CSS puro: no hay imágenes de flores.

## Cómo usarlo

1. Abre `index.html` (es la pantalla de bienvenida con el botón).
2. El botón lleva a `flower.html`, donde crece el ramo.

## Cambiar la canción

1. Copia tu canción dentro de la carpeta `sound/`.
2. Renómbrala a **`cancion.mp3`** — y listo, no hay que tocar código.
   (Si prefieres otro nombre, cámbialo en `anim.js`, en `CONFIG.cancion`.)

## Cambiar las frases

Están en `anim.js`, en el array `FRASES`. Cada una tiene el texto y el
segundo de la canción en el que aparece:

```js
{ text: "Lo que quieras decirle", time: 34 },
```

`CONFIG.duracionFrase` define cuántos segundos queda cada frase en pantalla
y `CONFIG.ocultarTituloEn`, en qué segundo se desvanece el mensaje grande.

## Cambiar el mensaje grande

Está en `flower.html`, dentro de `<h1 class="titulo">`.

## Cambiar qué flores aparecen y de qué color

Todo el ramo se arma a partir de una sola lista, pensada para editarse
a mano si quieres otra combinación (aunque no vuelvas a correr ningún
script: `flower.html` y `css/main.css` ya están generados con la
combinación actual).

Si quieres otra combinación de tipos y colores, dime cuáles prefieres
y te regenero los archivos.

Los cuatro tonos disponibles son `rosa`, `lila`, `morado` y `rojo`
(clases `.hue--rosa`, `.hue--lila`, `.hue--morado`, `.hue--rojo` en
`css/main.css`, dentro del bloque `/* Variantes de color */`). Cada
tono define tres variables (`--g1` oscuro, `--g2` medio, `--g3` claro)
que puedes ajustar ahí si quieres afinar los colores exactos.

## Detalles añadidos

- Si el navegador bloquea la reproducción automática, aparece un botón
  **“Toca para empezar”** (pasa casi siempre en móviles).
- Si falta el archivo de audio, la animación y las frases se muestran igual.
- Se agregó el `@keyframes fadeOut` que faltaba: antes el mensaje grande
  desaparecía de golpe.

---

Basado en el proyecto original: https://youtu.be/ZSSOiJaMIk0
