# Mapa BID — tablet y mesa

Visualización regional para una mesa horizontal y control remoto desde una tablet. Ambas pantallas se sincronizan por Firebase Realtime Database.

## Ejecutar localmente

```bash
npm start
```

- Mesa: `http://localhost:8080/display`
- Tablet: `http://localhost:8080/controller`

## Publicar en Netlify

El repositorio incluye `netlify.toml`. Netlify ejecutará `npm run build` y publicará la carpeta `dist`.

1. Importa este repositorio desde GitHub en Netlify.
2. Conserva la configuración detectada:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Publica el sitio.
4. Abre `/display` en la mesa y `/controller` en la tablet.

No se requiere un archivo `.env` para la configuración web actual de Firebase. El acceso a los datos debe protegerse mediante reglas de Realtime Database y, para producción, Firebase App Check o autenticación.

