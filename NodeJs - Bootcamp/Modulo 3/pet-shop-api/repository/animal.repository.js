import { connect } from './db.js';

async function createAnimal(animal) {
  const conn = await connect();
  try {
    const sql =
      'INSERT INTO animais (nome, tipo, proprietario_id) VALUES($1,$2,$3)';
    const values = [animal.nome, animal.tipo, animal.proprietario_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}
async function updateAnimal(animal) {
  const conn = await connect();
  try {
    const sql = 'UPDATE animais SET nome = $1, tipo = $2 where animal_id = $3';
    const values = [animal.nome, animal.telefone, animal.animal_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteAnimal(id) {
  const conn = await connect();
  try {
    const sql = 'DELETE FROM animais WHERE animal_id = $1';
    const values = [id];
    await conn.query(sql, values);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}
async function getAllAnimals() {
  const conn = await connect();
  try {
    const sql = 'SELECT * FROM animais';
    const res = await conn.query(sql);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getAnimal(id) {
  const conn = await connect();
  try {
    const sql = 'SELECT * FROM animais WHERE animal_id = $1';
    const values = [id];
    const res = await conn.query(sql, values);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}
async function getAllAnimalsByOwner(id) {
  const conn = await connect();
  try {
    const sql = 'SELECT * FROM animais WHERE proprietario_id = $1';
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
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimal,
  getAllAnimalsByOwner,
};
