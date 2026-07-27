'use strict';

const { app } = require('@azure/functions');
const { json, errorResponse } = require('../lib/http');
const { authorizeFeedback } = require('../lib/feedback-auth');
const { listComments } = require('../lib/store-feedback');

// GET /api/feedback/list?prototypeId=&page=&token=
app.http('feedbackList', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'feedback/list',
  handler: async (request) => {
    try {
      const prototypeId = String(request.query.get('prototypeId') || '').trim();
      const page = String(request.query.get('page') || '').trim();
      const token = String(request.query.get('token') || '').trim();
      if (!prototypeId) return json(400, { error: 'prototypeId is required' });

      await authorizeFeedback(request, prototypeId, token);
      const comments = await listComments(prototypeId, page || null);
      return json(200, { comments });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
