'use strict';

/**
 * Minimal RFC 6455 WebSocket server for the DesignLoop bridge — zero external
 * dependencies (uses only Node built-ins). Enough to talk to the DesignLoop
 * Figma plugin: text frames both ways, ping/pong, close, and large fragmented
 * payloads (the serialized design tree can be big).
 *
 * Not a general-purpose implementation — no permessage-deflate, no subprotocols.
 */

const crypto = require('crypto');

const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

/** A single connected client. Wraps the raw socket with send()/close() + events. */
class WsConnection {
  constructor(socket) {
    this.socket = socket;
    this._handlers = { message: [], close: [] };
    this._buf = Buffer.alloc(0);
    this._frags = [];      // accumulated payloads for a fragmented message
    this._fragOp = null;   // opcode of the in-progress fragmented message
    this.alive = true;

    socket.on('data', (chunk) => this._onData(chunk));
    socket.on('close', () => this._fireClose());
    socket.on('error', () => this._fireClose());
  }

  on(event, fn) {
    if (this._handlers[event]) this._handlers[event].push(fn);
    return this;
  }

  _fireClose() {
    if (!this.alive) return;
    this.alive = false;
    for (const fn of this._handlers.close) { try { fn(); } catch {} }
  }

  _emitMessage(str) {
    for (const fn of this._handlers.message) { try { fn(str); } catch {} }
  }

  /** Send a text message. Server frames are never masked. */
  send(str) {
    if (!this.alive) return false;
    try {
      this.socket.write(encodeFrame(Buffer.from(String(str), 'utf8'), 0x1));
      return true;
    } catch { return false; }
  }

  close(code = 1000) {
    if (!this.alive) return;
    try {
      const payload = Buffer.alloc(2);
      payload.writeUInt16BE(code, 0);
      this.socket.write(encodeFrame(payload, 0x8));
    } catch {}
    try { this.socket.end(); } catch {}
    this._fireClose();
  }

  _onData(chunk) {
    this._buf = Buffer.concat([this._buf, chunk]);
    // Parse as many complete frames as are buffered.
    for (;;) {
      const frame = decodeFrame(this._buf);
      if (!frame) break;              // need more bytes
      this._buf = this._buf.slice(frame.total);
      this._handleFrame(frame);
    }
  }

  _handleFrame(frame) {
    const { fin, opcode, payload } = frame;
    switch (opcode) {
      case 0x0: // continuation
        this._frags.push(payload);
        if (fin) this._finishFragments();
        break;
      case 0x1: // text
      case 0x2: // binary (treated as text/utf8 too)
        if (fin) {
          this._emitMessage(payload.toString('utf8'));
        } else {
          this._fragOp = opcode;
          this._frags = [payload];
        }
        break;
      case 0x8: // close
        this.close();
        break;
      case 0x9: // ping -> pong
        try { this.socket.write(encodeFrame(payload, 0xA)); } catch {}
        break;
      case 0xA: // pong
        break;
      default:
        break;
    }
  }

  _finishFragments() {
    const full = Buffer.concat(this._frags);
    this._frags = [];
    this._fragOp = null;
    this._emitMessage(full.toString('utf8'));
  }
}

/** Encode a server->client frame (unmasked). opcode: 0x1 text, 0x8 close, 0xA pong. */
function encodeFrame(payload, opcode) {
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[1] = 127;
    // 64-bit length: high 32 bits are 0 for our payload sizes.
    header.writeUInt32BE(0, 2);
    header.writeUInt32BE(len, 6);
  }
  header[0] = 0x80 | (opcode & 0x0f); // FIN + opcode
  return Buffer.concat([header, payload]);
}

/** Decode one client->server frame from buf, or null if incomplete. */
function decodeFrame(buf) {
  if (buf.length < 2) return null;
  const fin = (buf[0] & 0x80) === 0x80;
  const opcode = buf[0] & 0x0f;
  const masked = (buf[1] & 0x80) === 0x80;
  let len = buf[1] & 0x7f;
  let offset = 2;

  if (len === 126) {
    if (buf.length < offset + 2) return null;
    len = buf.readUInt16BE(offset);
    offset += 2;
  } else if (len === 127) {
    if (buf.length < offset + 8) return null;
    // Ignore the high 32 bits (payloads are well under 4GB).
    len = buf.readUInt32BE(offset + 4);
    offset += 8;
  }

  let maskKey;
  if (masked) {
    if (buf.length < offset + 4) return null;
    maskKey = buf.slice(offset, offset + 4);
    offset += 4;
  }

  if (buf.length < offset + len) return null;
  let payload = buf.slice(offset, offset + len);
  if (masked) {
    const out = Buffer.alloc(len);
    for (let i = 0; i < len; i++) out[i] = payload[i] ^ maskKey[i & 3];
    payload = out;
  }
  return { fin, opcode, payload, total: offset + len };
}

/**
 * Attach a WebSocket endpoint to an existing http.Server.
 * @param {import('http').Server} server
 * @param {string} pathname - only upgrade requests to this path are accepted.
 * @param {(conn: WsConnection, req) => void} onConnection
 */
function attachWss(server, pathname, onConnection) {
  server.on('upgrade', (req, socket) => {
    let reqPath = req.url;
    try { reqPath = new URL(req.url, 'http://localhost').pathname; } catch {}
    if (reqPath !== pathname) return; // let other handlers (or nothing) deal with it

    const key = req.headers['sec-websocket-key'];
    if (!key || (req.headers.upgrade || '').toLowerCase() !== 'websocket') {
      socket.destroy();
      return;
    }
    const accept = crypto.createHash('sha1').update(key + GUID).digest('base64');
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${accept}\r\n\r\n`,
    );
    socket.setNoDelay(true);
    const conn = new WsConnection(socket);
    try { onConnection(conn, req); } catch {}
  });
}

module.exports = { attachWss, WsConnection, encodeFrame, decodeFrame };
