'use strict';

const jwt = require('jsonwebtoken');
const { app } = require('@azure/functions');
const { json } = require('../lib/http');

// TEMPORARY diagnostic endpoint. GET /api/shares/debug
// Echoes what the running function sees so we can reconcile token vs config.
// Does not leak secrets: the client id is a public value.
app.http('sharesDebug', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'shares/debug',
  handler: async (request) => {
    const raw = request.headers.get('authorization') || '';
    const m = /^Bearer\s+(.+)$/i.exec(raw.trim());
    const token = m ? m[1] : null;
    let decoded = null;
    let decodeType = null;
    if (token) {
      try {
        const d = jwt.decode(token, { complete: true });
        decodeType = d === null ? 'null' : typeof d;
        decoded = d && d.payload ? { aud: d.payload.aud, iss: d.payload.iss, exp: d.payload.exp } : null;
      } catch (e) {
        decodeType = 'error:' + e.message;
      }
    }
    return json(200, {
      authClientIdSet: !!process.env.AUTH_CLIENT_ID,
      authClientId: process.env.AUTH_CLIENT_ID || null,
      hasBearer: !!token,
      decodeType,
      decoded,
      jsonwebtokenVersion: require('jsonwebtoken/package.json').version,
    });
  },
});
