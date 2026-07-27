'use strict';

const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { authorizeFeedback } = require('../lib/feedback-auth');
const { getComment, deleteComment } = require('../lib/store-feedback');

// POST /api/feedback/delete
// body: { prototypeId, id, token? }
// Deletion is restricted to internal (owner) callers.
app.http('feedbackDelete', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'feedback/delete',
  handler: async (request) => {
    try {
      const body = await readJson(request);
      const prototypeId = String(body.prototypeId || '').trim();
      const id = String(body.id || '').trim();
      if (!prototypeId || !id) return json(400, { error: 'prototypeId and id are required' });

      const identity = await authorizeFeedback(
        request,
        prototypeId,
        String(body.token || '').trim(),
      );
      if (identity.source !== 'internal') {
        return json(403, { error: 'Only the prototype owner can delete comments' });
      }

      const comment = await getComment(prototypeId, id);
      if (!comment) return json(200, { ok: true });
      await deleteComment(prototypeId, id);
      return json(200, { ok: true });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
