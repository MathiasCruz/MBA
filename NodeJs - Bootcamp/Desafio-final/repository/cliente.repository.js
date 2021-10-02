const db = require("./db.js");

async function criarCliente(cliente) {
  try {
    await db.connect();
    const values = [
      cliente.nome,
      cliente.email,
      cliente.senha,
      cliente.telefone,
      cliente.endereco,
    ];
    const clienteCriado = await db.query(
      "INSERT INTO clientes(nome, email, senha, telefone, endereco) VALUES($1, $2, $3, $4, $5)",
      values
    );
    return clienteCriado.rows[0];
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
}

async function atualizarCliente(cliente) {
  try {
    await db.connect();
    const query =
      "UPDATE clientes SET nome = $1,email = $2,senha = $3, telefone = $4, endereco = $5 where cliente_id = $6";
    const values = [
      cliente.nome,
      cliente.email,
      cliente.senha,
      cliente.telefone,
      cliente.endereco,
      cliente.id,
    ];
    return await db.query(query, values);
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
}

async function buscarCliente(id) {
  try {
    await db.connect();
    const query = "SELECT * FROM clientes WHERE cliente_id = $1";
    const values = [id];
    const cliente = await db.query(query, values);
    return cliente.rows[0];
  } catch (err) {
  } finally {
    db.end();
  }
}

module.exports = {
  criarCliente,
  atualizarCliente,
};
