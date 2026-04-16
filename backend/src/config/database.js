// backend/src/config/database.js
/**
 * Pool de connexions PostgreSQL partagé dans toute l'application.
 * Chargé via Node 24 : node --env-file=.env src/app.js
 * @module database
 */
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'minilib',
  user: process.env.DB_USER || 'minilib',
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => console.log('[DB] Pool PostgreSQL connecté'));
pool.on('error', (err) => console.error('[DB] Erreur pool:', err.message));

export default pool;