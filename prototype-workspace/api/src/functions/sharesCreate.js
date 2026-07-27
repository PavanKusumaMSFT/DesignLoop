'use strict';

const crypto = require('crypto');
const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { requireUser, userEmail } = require('../lib/auth');
const { hashPassword } = require('../lib/hash');
const { upsertShare } = require('../lib/store');

const MAX_MINUTES = 60 * 24 * 30; // 30 days

// POST /api/shares  (owner-only)
// body: { prototypeId, route, password, expiresInMinutes, label? }
app.http('sharesCreate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'shares',
  handler: async (request) => {
    try {
      const claims = await requireUser(request);
      const body = await readJson(request);

      const prototypeId = String(body.prototypeId || '').trim();
      const route = String(body.route || '').trim();
      const password = String(body.password || '');
      let minutes = parseInt(body.expiresInMinutes, 10);

      if (!prototypeId) return json(400, { error: 'prototypeId is required' });
      if (password.length < 4)
        return json(400, { error: 'Password must be at least 4 characters' });
      if (!Number.isFinite(minutes) || minutes <= 0)
        return json(400, { error: 'expiresInMinutes must be a positive number' });
      if (minutes > MAX_MINUTES) minutes = MAX_MINUTES;

      const token = crypto.randomBytes(16).toString('hex');
      const now = new Date();
      const expiresAt = new Date(now.getTime() + minutes * 60 * 1000).toISOString();
      const passwordHash = await hashPassword(password);

      await upsertShare({
        prototypeId,
        token,
        passwordHash,
        expiresAt,
        locked: false,
        label: String(body.label || '').slice(0, 120),
        route,
        createdBy: userEmail(claims),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });

      return json(201, { token, expiresAt, route, prototypeId, locked: false });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
