'use strict';

const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { authorizeFeedback } = require('../lib/feedback-auth');
const { getComment, replaceComment } = require('../lib/store-feedback');

// POST /api/feedback/update
// body: { prototypeId, id, token?, action, ...payload }
//   action = "reply"    -> { author, text }
//   action = "resolve"  -> marks status resolved (resolvedBy = author)
//   action = "reopen"   -> marks status open
//   action = "edit"     -> { text }  (edit the root comment text)
app.http('feedbackUpdate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'feedback/update',
  handler: async (request) => {
    try {
      const body = await readJson(request);
      const prototypeId = String(body.prototypeId || '').trim();
      const id = String(body.id || '').trim();
      const action = String(body.action || '').trim();
      if (!prototypeId || !id) return json(400, { error: 'prototypeId and id are required' });

      const identity = await authorizeFeedback(
        request,
        prototypeId,
        String(body.token || '').trim(),
      );
      const comment = await getComment(prototypeId, id);
      if (!comment) return json(404, { error: 'Comment not found' });

      const who =
        identity.source === 'internal'
          ? identity.email || String(body.author || 'Reviewer')
          : String(body.author || 'Anonymous').slice(0, 80);

      if (action === 'reply') {
        const text = String(body.text || '').trim();
        if (!text) return json(400, { error: 'Reply text is required' });
        if (text.length > 4000) return json(400, { error: 'Reply is too long' });
        comment.replies.push({ author: who, text, at: new Date().toISOString() });
      } else if (action === 'resolve') {
        comment.status = 'resolved';
        comment.resolvedBy = who;
      } else if (action === 'reopen') {
        comment.status = 'open';
        comment.resolvedBy = null;
      } else if (action === 'edit') {
        const text = String(body.text || '').trim();
        if (!text) return json(400, { error: 'Comment text is required' });
        comment.text = text.slice(0, 4000);
      } else {
        return json(400, { error: `Unknown action: ${action}` });
      }

      comment.updatedAt = new Date().toISOString();
      await replaceComment(comment);
      return json(200, { comment });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
