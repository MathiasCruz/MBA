const db = require("../model/livraria.models.js");

async function criarAutor(autor) {
  try {
    return await db.autores.create(autor);
  } catch (err) {
    throw err;
  }
}

async function atualizarAutor(autor) {
  try {
    await db.autores.update(autor, { where: { autorId: autor.id } });
    return await buscarAutor(autor.id);
  } catch (err) {
    throw err;
  }
}

async function buscarTodos() {
  try {
    await db.autores.findaAll();
    return await buscarAutor(autor.id);
  } catch (err) {
    throw err;
  }
}
async function buscarAutor(id) {
  try {
    return await db.autores.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarAutor(id) {
  try {
    await db.autores.destroy({ where: { autorId: id } });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  criarAutor,
  atualizarAutor,
  buscarAutor,
  deletarAutor,
  buscarTodos
};
