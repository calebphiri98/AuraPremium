// backend/src/config/db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon secure SSL connections
  },
});

// This listener fires on the very first successful connection
pool.on('connect', () => {
  console.log('Connected to Neon Database successfully.');
});

// Run a quick "heartbeat" query to force an immediate connection test
pool.query('SELECT NOW()')
  .then(() => console.log('⚡ Initial database handshake successful!'))
  .catch(err => console.error('❌ Database connection failed:', err.message));

// Clean ES Module exports
export const query = (text, params) => pool.query(text, params);
export default pool;