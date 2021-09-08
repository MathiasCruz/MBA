import { connect } from './db.js';
async function insertProprietario(proprietario) {
  const conn = await connect();
  try {
    const sql = 'INSERT INTO proprietarios (nome,telefone) VALUES($1,$2)';
    const values = [proprietario.nome, proprietario.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateProprietario(proprietario) {
  const conn = await connect();
  try {
    const sql =
      'UPDATE proprietarios SET nome = $1, telefone = $2 where proprietario_id = $3';
    const values = [
      proprietario.nome,
      proprietario.telefone,
      proprietario.proprietario_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteProprietario(id) {
  const conn = await connect();
  try {
    const sql = 'DELETE FROM proprietarios WHERE proprietario_id = $1';
    const values = [id];
    await conn.query(sql, values);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getAllProprietario() {
  const conn = await connect();
  try {
    const sql = 'SELECT * FROM proprietarios';
    const res = await conn.query(sql);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getProprietario(id) {
  const conn = await connect();
  try {
    const sql = 'SELECT * FROM proprietarios WHERE proprietario_id = $1';
    const values = [id];
    const res = await conn.query(sql, values);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertProprietario,
  updateProprietario,
  deleteProprietario,
  getAllProprietario,
  getProprietario,
};
