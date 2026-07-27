'use strict';

const crypto = require('crypto');
const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { authorizeFeedback } = require('../lib/feedback-auth');
const { createComment } = require('../lib/store-feedback');

function cleanAnchor(a) {
  a = a && typeof a === 'object' ? a : {};
  const num = (v, d = 0) => (typeof v === 'number' && isFinite(v) ? v : d);
  return {
    selector: String(a.selector || '').slice(0, 2000),
    text: String(a.text || '').slice(0, 200),
    relX: num(a.relX, 0.5),
    relY: num(a.relY, 0.5),
    docX: num(a.docX, 0),
    docY: num(a.docY, 0),
    label: String(a.label || 'element').slice(0, 120),
  };
}

// POST /api/feedback/create
// body: { prototypeId, route, page, author, authorSource, text, anchor, token? }
app.http('feedbackCreate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'feedback/create',
  handler: async (request) => {
    try {
      const body = await readJson(request);
      const prototypeId = String(body.prototypeId || '').trim();
      const text = String(body.text || '').trim();
      if (!prototypeId) return json(400, { error: 'prototypeId is required' });
      if (!text) return json(400, { error: 'Comment text is required' });
      if (text.length > 4000) return json(400, { error: 'Comment is too long' });

      const identity = await authorizeFeedback(
        request,
        prototypeId,
        String(body.token || '').trim(),
      );

      const author =
        identity.source === 'internal'
          ? identity.email || String(body.author || 'Reviewer')
          : String(body.author || 'Anonymous').slice(0, 80);

      const now = new Date().toISOString();
      const comment = {
        id: `c_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`,
        prototypeId,
        route: String(body.route || '').slice(0, 400),
        page: String(body.page || body.route || '').slice(0, 400),
        author,
        authorSource: identity.source,
        text,
        status: 'open',
        anchor: cleanAnchor(body.anchor),
        replies: [],
        createdAt: now,
        updatedAt: now,
        resolvedBy: null,
      };
      await createComment(comment);
      return json(200, { comment });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
