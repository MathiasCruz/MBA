const infoRepo = require("../repository/info.livro.repository.js");

async function criarInfo(info) {
  return await infoRepo.criarInfo(info);
}

async function atualizarInfo(info) {
  return await infoRepo.atualizarInfo(info);
}

async function deletarInfo(id) {
  return await infoRepo.deletarInfo(id);
}

async function criarAvaliacao(avaliacao, id) {
  return await infoRepo.criarAvaliacao(avaliacao, id);
}

async function deletarAvaliacao(idLivro, indice) {
    return await infoRepo.deletarAvaliacao(idLivro,indice)
}
module.exports = { criarInfo, atualizarInfo, deletarInfo,criarAvaliacao,deletarAvaliacao };
