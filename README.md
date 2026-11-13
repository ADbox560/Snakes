# 🎲 Serpientes y Escaleras: Reto de Estudio

Juego de tablero en HTML, CSS y JavaScript puro (sin dependencias ni instalación) para repasar un cuestionario.
Cada jugador tira el dado, responde una pregunta y, si acierta, avanza. Las escaleras suben y las serpientes bajan.

## Cómo jugar

1. Abre `index.html` en tu navegador (doble clic).
2. Agrega de 1 a 10 jugadores (avatar + nombre) y presiona **¡Comenzar!**
3. En cada turno: **Tirar dado** → responder la pregunta → si aciertas, avanzas.

### Reglas

- Quien llega a la casilla 100 consigue su lugar en el podio (1º, 2º, 3º…) y sale del tablero; **el juego continúa con los demás**.
- La partida termina cuando **se acaban las preguntas** o cuando **ya no queda nadie jugando** (todos llegaron a la meta o fueron eliminados).
- Si un jugador tarda más de 20 segundos en decidir, otro puede **robarle el avance** y responder en su lugar.
- Quien cae en 4 serpientes queda eliminado.
- Se puede **guardar y cargar el avance** de la partida (archivo JSON).

## Usar tus propias preguntas

En la pantalla inicial, abre **Cargar mis preguntas** y pega un arreglo JSON:

```json
[
  { "q": "Pregunta", "o": ["A", "B", "C", "D"], "a": 0, "e": "Justificación de la respuesta" }
]
```

`a` es el índice de la respuesta correcta (0 = inciso A). Para cambiar el banco por defecto, edita `js/preguntas.js`.

## Estructura del proyecto

```
serpientes-y-escaleras/
├── index.html          # Estructura de la página
├── css/
│   └── styles.css      # Estilos (tema claro/oscuro)
└── js/                 # Se cargan en este orden
    ├── preguntas.js    # Banco de 50 preguntas
    ├── config.js       # Escaleras, serpientes, avatares, reglas y estado global
    ├── utils.js        # Utilidades: DOM, escape de HTML, coordenadas, medallas, confeti
    ├── jugadores.js    # Pantalla inicial y alta de jugadores
    ├── tablero.js      # Casillas, fichas y dibujo de escaleras/serpientes
    ├── juego.js        # Turnos, dado, preguntas, movimiento, podio y fin de partida
    ├── guardado.js     # Guardar y cargar avance
    └── main.js         # Arranque
```

Los scripts son clásicos (no módulos ES) para que el juego funcione abriendo `index.html` directamente, sin servidor.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio.
2. En **Settings → Pages**, elige la rama `main` y la carpeta `/ (root)`.
3. El juego quedará disponible en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
