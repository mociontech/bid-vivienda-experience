const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = Number(process.env.PORT || 8080);
const ROOT = __dirname;

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
  }[ext] || 'application/octet-stream';
}

function resolveStaticPath(urlPath) {
  if (urlPath === '/' || urlPath === '/index') return path.join(ROOT, 'index.html');
  if (urlPath === '/display') return path.join(ROOT, 'index.html');
  if (urlPath === '/controller') return path.join(ROOT, 'controller.html');
  return path.join(ROOT, decodeURIComponent(urlPath.slice(1)));
}

function isInsideRoot(filePath) {
  const resolved = path.resolve(filePath);
  const root = path.resolve(ROOT);
  return resolved === root || resolved.startsWith(root + path.sep);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Método no permitido');
    return;
  }

  const filePath = resolveStaticPath(url.pathname);
  if (!isInsideRoot(filePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ruta no permitida');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Archivo no encontrado');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType(filePath),
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
});

function localAddresses() {
  const addresses = [];
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries || []) {
      if (entry.family === 'IPv4' && !entry.internal) addresses.push(entry.address);
    }
  }
  return addresses;
}

server.listen(PORT, '0.0.0.0', () => {
  console.log('\nServidor BID MAPA listo');
  console.log('Uso: servidor estático para pruebas locales. La sincronización real es por Firebase.');
  console.log(`Mesa/display local:     http://localhost:${PORT}/display`);
  console.log(`Tablet/control local:   http://localhost:${PORT}/controller`);

  for (const address of localAddresses()) {
    console.log(`Mesa en red local:      http://${address}:${PORT}/display`);
    console.log(`Tablet en red local:    http://${address}:${PORT}/controller`);
  }

  console.log('\nPara evento por internet, despliega en Firebase Hosting.');
  console.log('Completa firebase-config.js antes de probar la sincronización.');
  console.log('Presiona Ctrl+C para detener.\n');
});
