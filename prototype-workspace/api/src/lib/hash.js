'use strict';

const bcrypt = require('bcryptjs');

const ROUNDS = 10;

async function hashPassword(plain) {
  return bcrypt.hash(String(plain), ROUNDS);
}

async function verifyPassword(plain, hash) {
  if (!hash) return false;
  try {
    return await bcrypt.compare(String(plain), String(hash));
  } catch {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };
