import pg from 'pg';

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString:
      'postgres://izzrgthd:7hBogXLmz4RGcdlREgI2oL5y-S06VWgV@kesavan.db.elephantsql.com/izzrgthd',
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
