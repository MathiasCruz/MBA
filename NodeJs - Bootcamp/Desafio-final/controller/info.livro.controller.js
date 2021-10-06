const infoService = require("../service/info.livro.service.js");

async function criarInfo(req, res, next) {
  try {
    const info = req.body;
    if (
      !info.livroId ||
      !info.descricao ||
      !info.paginas ||
      !info.editora ||
      !info.avaliacoes
    ) {
      throw new Error(
        "Id livro, descricao, paginas, editora e avaliacoes sao obrigatorios"
      );
    }
    res.send(await infoService.criarInfo(info));
  } catch (err) {
    next(err);
  }
}

async function atualizarInfo(req, res, next) {
  try {
    const info = req.body;
    if (
      !info.livroId ||
      !info.descricao ||
      !info.paginas ||
      !info.editora ||
      !info.avaliacoes
    ) {
      throw new Error(
        "Id livro, descricao, paginas, editora e avaliacoes sao obrigatorios"
      );
    }
    res.send(await infoService.atualizarInfo(info));
  } catch (err) {
    next(err);
  }
}
async function criarAvaliacao(req, res, next) {
  try {
    const info = req.body;
    const id = req.params.id;
    if (!info.nome || !info.nota || !info.descricao || !id) {
      throw new Error(
        "Id livro, descricao, nota, nome de usuario sao obrigatorios"
      );
    }
    res.send(await infoService.criarAvaliacao(info, id));
  } catch (err) {
    next(err);
  }
}

async function deletarInfo(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id livro é obrigatorio");
    }
    res.send(await infoService.deletarInfo(id));
  } catch (err) {
    next(err);
  }
}

async function deletarAvaliacao(req, res, next){
    try {
        const id = req.params.id;
        const indice = req.params.indice
        if (!id || !indice) {
          throw new Error("Id livro e indice sao obrigatorios");
        }
        res.send(await infoService.deletarAvaliacao(id,indice));
      } catch (err) {
        next(err);
      }
}

module.exports = { criarInfo, atualizarInfo, deletarInfo, criarAvaliacao,deletarAvaliacao };
