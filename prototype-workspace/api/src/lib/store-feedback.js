'use strict';

// Table Storage access for prototype feedback / comments. One table `feedback`:
//   partitionKey = prototypeId, rowKey = comment id.
// Reuses the same storage account/connection string as shares
// (SHARES_TABLE_CONNECTION) so no additional configuration is required.
const { TableClient, odata } = require('@azure/data-tables');

const TABLE_NAME = 'feedback';

function connectionString() {
  const conn = process.env.SHARES_TABLE_CONNECTION;
  if (!conn) throw new Error('SHARES_TABLE_CONNECTION is not configured.');
  return conn;
}

function client() {
  return TableClient.fromConnectionString(connectionString(), TABLE_NAME);
}

let ensured = false;
async function ensureTable(c) {
  if (ensured) return;
  try {
    await c.createTable();
  } catch (e) {
    if (!/TableAlreadyExists|already exists/i.test(e.message || '')) throw e;
  }
  ensured = true;
}

// Table Storage stores flat primitives, so structured fields are JSON strings.
function toEntity(c) {
  return {
    partitionKey: c.prototypeId,
    rowKey: c.id,
    prototypeId: c.prototypeId,
    id: c.id,
    route: c.route || '',
    page: c.page || '',
    author: c.author || '',
    authorSource: c.authorSource || 'external',
    text: c.text || '',
    status: c.status || 'open',
    anchor: JSON.stringify(c.anchor || {}),
    replies: JSON.stringify(c.replies || []),
    createdAt: c.createdAt,
    updatedAt: c.updatedAt || c.createdAt,
    resolvedBy: c.resolvedBy || '',
  };
}

function fromEntity(e) {
  let anchor = {};
  let replies = [];
  try { anchor = JSON.parse(e.anchor || '{}'); } catch { /* ignore */ }
  try { replies = JSON.parse(e.replies || '[]'); } catch { /* ignore */ }
  return {
    id: e.rowKey,
    prototypeId: e.partitionKey,
    route: e.route || '',
    page: e.page || '',
    author: e.author || '',
    authorSource: e.authorSource || 'external',
    text: e.text || '',
    status: e.status || 'open',
    anchor,
    replies,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt || e.createdAt,
    resolvedBy: e.resolvedBy || null,
  };
}

async function createComment(c) {
  const cl = client();
  await ensureTable(cl);
  await cl.createEntity(toEntity(c));
  return c;
}

async function getComment(prototypeId, id) {
  const cl = client();
  await ensureTable(cl);
  try {
    return fromEntity(await cl.getEntity(prototypeId, id));
  } catch (e) {
    if (e.statusCode === 404) return null;
    throw e;
  }
}

async function listComments(prototypeId, page) {
  const cl = client();
  await ensureTable(cl);
  const out = [];
  const iter = cl.listEntities({
    queryOptions: { filter: odata`PartitionKey eq ${prototypeId}` },
  });
  for await (const e of iter) {
    const c = fromEntity(e);
    if (!page || c.page === page) out.push(c);
  }
  out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return out;
}

async function replaceComment(c) {
  const cl = client();
  await ensureTable(cl);
  await cl.updateEntity(toEntity(c), 'Replace');
  return c;
}

async function deleteComment(prototypeId, id) {
  const cl = client();
  await ensureTable(cl);
  try {
    await cl.deleteEntity(prototypeId, id);
  } catch (e) {
    if (e.statusCode !== 404) throw e;
  }
}

module.exports = {
  createComment,
  getComment,
  listComments,
  replaceComment,
  deleteComment,
};
