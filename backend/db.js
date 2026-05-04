const { Database } = require('node-sqlite3-wasm');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'portify.db');
let db = null;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
  }
  return db;
}

module.exports = { getDb };
