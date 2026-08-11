# Ejecución con Firebase por internet

El proyecto ya quedó configurado para Firebase `f1-sap`.

La sincronización tablet → mesa usa este nodo de Realtime Database:

```text
bidMapaSessions/maqueta-1-bid-pruebas/state
```

## 1. Publicar reglas en Realtime Database

En Firebase Console > Realtime Database > Reglas, reemplaza las reglas actuales por el contenido completo de:

```text
database.rules.json
```

Ese archivo conserva tus nodos existentes:

- `messages`
- `live_reactions`

Y agrega el nodo nuevo:

- `bidMapaSessions`

## 2. Probar localmente con internet

Abre PowerShell:

```powershell
cd "C:\Users\USUARIO\Downloads\maqueta 1 BID MAPA"
npm start
```

Luego abre:

```text
http://localhost:8080/display
http://localhost:8080/controller
```

Prueba cambiando indicador o país desde `/controller`. En Firebase deberías ver aparecer:

```text
bidMapaSessions
  maqueta-1-bid-pruebas
    state
      category
      mode
      countryIso3
      subregion
      updatedAt
```

## 3. Desplegar a Firebase Hosting

Si no tienes Firebase CLI:

```powershell
npm install -g firebase-tools
```

Inicia sesión:

```powershell
firebase login
```

Despliega:

```powershell
firebase deploy --only hosting,database
```

## 4. URLs para tablet y mesa

Mesa touch:

```text
https://f1-sap.web.app/display
```

Tablet:

```text
https://f1-sap.web.app/controller
```

Si Firebase te da también dominio `firebaseapp.com`, estas rutas también funcionan:

```text
https://f1-sap.firebaseapp.com/display
https://f1-sap.firebaseapp.com/controller
```

## Nota de seguridad

La configuración web de Firebase en `firebase-config.js` es pública por diseño. La seguridad se controla con `database.rules.json`.

Para el evento final, cambia el `sessionId` en `firebase-config.js` por uno menos obvio, por ejemplo:

```js
sessionId: "bid-evento-2026-x7k92"
```

La mesa y la tablet deben usar exactamente el mismo `sessionId`.
