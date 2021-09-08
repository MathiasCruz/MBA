import { connect } from './db.js';

async function insertSupplier(Supplier) {
  const conn = await connect();
  try {
    const sql =
      'INSERT INTO suppliers(name, cnpj,phone,email,address) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [
      Supplier.name,
      Supplier.cnpj,
      Supplier.phone,
      Supplier.email,
      Supplier.address,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getsuppliers() {
  const conn = await connect();
  try {
    const res = await conn.query('SELECT * FROM suppliers');
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getSupplier(id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      'SELECT * FROM suppliers WHERE Supplier_id = $1',
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}
async function deleteSupplier(id) {
  const conn = await connect();
  try {
    await conn.query('DELETE FROM suppliers WHERE Supplier_id = $1', [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateSupplier(Supplier) {
  const conn = await connect();
  try {
    const sql =
      'UPDATE suppliers SET name = $1, cnpj =$2, phone = $3, email = $4, address = $5 WHERE Supplier_id = $6';
    let values = [
      Supplier.name,
      Supplier.cnpj,
      Supplier.phone,
      Supplier.email,
      Supplier.address,
      Supplier.Supplier_id,
    ];
    let res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}
export default {
  insertSupplier,
  getsuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
