'use strict';

function json(status, body) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    jsonBody: body,
  };
}

async function readJson(request) {
  try {
    return (await request.json()) || {};
  } catch {
    return {};
  }
}

// Map a thrown auth error (with .status) or a generic error to a response.
function errorResponse(e) {
  const status = e && e.status ? e.status : 500;
  return json(status, { error: e && e.message ? e.message : 'Internal error' });
}

module.exports = { json, readJson, errorResponse };
