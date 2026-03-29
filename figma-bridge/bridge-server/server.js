const WebSocket = require('ws');

const PORT = 9001;
const wss = new WebSocket.Server({ port: PORT });

let pluginWs = null;
const pending = new Map(); // id → sender ws

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    // Plugin registration
    if (msg.type === 'register' && msg.role === 'plugin') {
      pluginWs = ws;
      console.log('[Bridge] Figma plugin registered');
      ws.send(JSON.stringify({ type: 'registered', role: 'plugin' }));
      return;
    }

    // Any non-plugin client sends a command → forward to plugin
    if (ws !== pluginWs) {
      if (pluginWs && pluginWs.readyState === WebSocket.OPEN) {
        pending.set(msg.id, ws);
        pluginWs.send(raw.toString());
      } else {
        ws.send(JSON.stringify({ id: msg.id, error: 'Figma plugin not connected. Open the Qrono Claude Bridge plugin in Figma first.' }));
      }
      return;
    }

    // Plugin sends a response → route back to original sender
    if (ws === pluginWs) {
      const sender = pending.get(msg.id);
      if (sender && sender.readyState === WebSocket.OPEN) {
        pending.delete(msg.id);
        sender.send(raw.toString());
      }
      return;
    }
  });

  ws.on('close', () => {
    if (ws === pluginWs) {
      pluginWs = null;
      console.log('[Bridge] Figma plugin disconnected');
    }
  });

  ws.on('error', () => {});
});

wss.on('listening', () => {
  console.log(`[Bridge] Listening on ws://localhost:${PORT}`);
});

wss.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Bridge] Port ${PORT} already in use.`);
    process.exit(1);
  }
});
