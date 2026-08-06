# bid-vivienda-experience

Experiencia interactiva para el BID: una tablet controla la selección de
indicadores de vivienda (déficit cuantitativo, cualitativo y acceso a
financiamiento) en América Latina y el Caribe, y una TV muestra en tiempo
real el mapa y los datos correspondientes. Sincronización vía Firebase
Realtime Database. Stack: React + Vite + TypeScript.

## Stack

- React + Vite + TypeScript
- react-router-dom (rutas `/tablet` y `/tv`)
- Firebase Realtime Database (estado compartido)
- react-simple-maps + d3-geo + topojson-client (mapa coroplético)

## Cómo funciona la sincronización

Ambas vistas leen/escriben el mismo nodo `sessions/<VITE_SESSION_ID>/state`
en la RTDB:

- `src/lib/firebase.ts` — inicializa Firebase y expone `sessionPath()`.
- `src/types/experience.ts` — forma del estado compartido (`SharedState`).
- `src/hooks/useSharedState.ts` — hook con `onValue` (lectura en tiempo real)
  y `patch()` (escritura parcial, se mezcla con defaults). Lo usan ambas vistas.
- `src/pages/TabletView.tsx` — UI de control, llama a `patch()`.
- `src/pages/TVView.tsx` — solo lectura, renderiza `state` + mapa + tarjeta de datos.

Si necesitas correr varias instalaciones en paralelo (varios países/eventos),
cambia `VITE_SESSION_ID` por instalación para que no se crucen los estados.

## Mapa

- `src/data/latamCountries.ts` — catálogo de países de LatAm/Caribe con su
  código ISO numérico (id usado por el topojson) y subregión.
- `src/data/sampleIndicators.ts` — **datos de relleno (placeholder)**
  generados de forma determinística, solo para poder construir y probar el
  mapa. Reemplazar por la fuente oficial del BID cuando esté disponible.
- `src/lib/colorScale.ts` — escalas de color por categoría.
- `src/components/LatamMap.tsx` — mapa coroplético (vista regional y zoom a
  país seleccionado). Usa `public/data/countries-50m.json` (topojson mundial
  recortado en runtime a LatAm/Caribe), servido localmente para funcionar
  sin conexión a internet durante el evento.

## Setup

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   y habilita Realtime Database (modo test o con reglas propias).
2. Copia `.env.example` a `.env` y pega las credenciales del proyecto.
3. Instala dependencias y corre:

```bash
npm install
npm run dev
```

4. Abre `http://localhost:5173/tablet` en la tablet y
   `http://localhost:5173/tv` en la TV (en la misma red o desplegado).

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — oxlint
- `npm run preview` — sirve el build

## Pendiente

- Reemplazar datos placeholder por la fuente oficial de indicadores.
- Diseño visual final (layout, tipografía, sidebar) según mockup.
- Definir hosting para el día del evento.
