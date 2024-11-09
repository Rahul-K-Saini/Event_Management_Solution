import "server-only";

import pg from 'pg'

const { Pool } = pg


const pool = new Pool({
    connectionString: process.env.DB_URL,
})

export default pool;