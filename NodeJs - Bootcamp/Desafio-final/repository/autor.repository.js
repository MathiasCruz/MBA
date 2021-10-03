const Autor = require("../model/autor.model.js");

async function criarAutor(autor) {
  try {
    return await Autor.create(autor);
  } catch (err) {
    throw err;
  }
}

async function atualizarAutor(autor) {
  try {
    await Autor.update(autor, { where: { autorId: autor.id } });
    return await buscarAutor(autor.id);
  } catch (err) {
    throw err;
  }
}

async function buscarAutor(id) {
  try {
    return await Autor.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deletarAutor(id) {
  try {
    await Autor.destroy({ where: { autorId: id } });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  criarAutor,
  atualizarAutor,
  buscarAutor,
  deletarAutor,
};
