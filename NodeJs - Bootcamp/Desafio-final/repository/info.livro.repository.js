const db = require("./mongodb.js");

async function criarInfo(info) {
  const cliente = db.getClient();
  try {
    await cliente.connect();
    await cliente.db("livraria").collection("livroInfo").insertOne(info);
  } catch (err) {
    throw err;
  } finally {
    await cliente.close();
  }
}

async function atualizarInfo(info) {
  const cliente = db.getClient();
  try {
    await cliente.connect();
    await cliente
      .db("livraria")
      .collection("livroInfo")
      .updateOne({ livroId: info.livroId }, { $set: { ...info } });
  } catch (err) {
    throw err;
  } finally {
    await cliente.close();
  }
}

async function deletarInfo(id) {
  const cliente = db.getClient();
  const livroId = parseInt(id);
  try {
    await cliente.connect();
    await cliente
      .db("livraria")
      .collection("livroInfo")
      .deleteOne({ livroId: livroId });
  } catch (err) {
    throw err;
  } finally {
    await cliente.close();
  }
}

async function buscarInfo(id) {
  const cliente = db.getClient();
  const livroId = parseInt(id);
  try {
    await cliente.connect();
    const resultado = await cliente
      .db("livraria")
      .collection("livroInfo")
      .findOne({ livroId: livroId });
    return resultado;
  } catch (err) {
    throw err;
  } finally {
    await cliente.close();
  }
}
async function criarAvaliacao(avaliacao, id) {
  try {
    const livroInfo = await buscarInfo(id);
    livroInfo.avaliacoes.push(avaliacao);
    await atualizarInfo(livroInfo);
  } catch (err) {
    throw err;
  }
}

async function deletarAvaliacao(idLivro, indice) {
  try {
    const livroInfo = await buscarInfo(idLivro);
    index = parseInt(indice);
    if (typeof livroInfo.avaliacoes[index] == "undefined") {
      throw new Error("Não existe essa avaliação");
    }
    livroInfo.avaliacoes.splice(index, 1);
    await atualizarInfo(livroInfo);
  } catch (err) {
    throw err;
  }
}
module.exports = {
  criarInfo,
  atualizarInfo,
  deletarInfo,
  criarAvaliacao,
  deletarAvaliacao,
};
