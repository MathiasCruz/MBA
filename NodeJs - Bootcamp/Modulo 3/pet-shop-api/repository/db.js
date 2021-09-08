import pg from 'pg';

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString:
      'postgres://dakjqsxs:3olo7t3R12cKAz4UYUE8b_5QJPhHQ1Mi@kesavan.db.elephantsql.com/dakjqsxs',
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
