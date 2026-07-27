'use strict';

// Table Storage access for prototype shares. One table `shares`:
//   partitionKey = prototypeId, rowKey = token.
const { TableClient, odata } = require('@azure/data-tables');

const TABLE_NAME = 'shares';

function connectionString() {
  const conn = process.env.SHARES_TABLE_CONNECTION;
  if (!conn) throw new Error('SHARES_TABLE_CONNECTION is not configured.');
  return conn;
}

function client() {
  return TableClient.fromConnectionString(connectionString(), TABLE_NAME);
}

// Create the table on first use; ignore "already exists".
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

async function upsertShare(entity) {
  const c = client();
  await ensureTable(c);
  await c.upsertEntity(
    {
      partitionKey: entity.prototypeId,
      rowKey: entity.token,
      prototypeId: entity.prototypeId,
      token: entity.token,
      passwordHash: entity.passwordHash,
      expiresAt: entity.expiresAt,
      locked: !!entity.locked,
      label: entity.label || '',
      route: entity.route || '',
      createdBy: entity.createdBy || '',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt || entity.createdAt,
    },
    'Replace',
  );
}

async function getShare(prototypeId, token) {
  const c = client();
  await ensureTable(c);
  try {
    return await c.getEntity(prototypeId, token);
  } catch (e) {
    if (e.statusCode === 404) return null;
    throw e;
  }
}

async function listShares(prototypeId) {
  const c = client();
  await ensureTable(c);
  const out = [];
  const iter = prototypeId
    ? c.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${prototypeId}` } })
    : c.listEntities();
  for await (const e of iter) out.push(e);
  return out;
}

async function patchShare(prototypeId, token, patch) {
  const c = client();
  await ensureTable(c);
  await c.updateEntity(
    { partitionKey: prototypeId, rowKey: token, ...patch },
    'Merge',
  );
}

module.exports = { upsertShare, getShare, listShares, patchShare };
