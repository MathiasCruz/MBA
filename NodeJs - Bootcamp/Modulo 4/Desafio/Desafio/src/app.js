const express = require("express");
const produtoService = require("./produtoService");
const app = express();

const { check, validationResult } = require("express-validator");

app.use(express.json());

app.put("/produto", async (req, res) => {
  if (!req.body.codigo || !req.body.descricao || !req.body.preco) {
    return res.status(400).json({ Erros: "Parametros obrigatorios" });
  }
  try {
    const produto = await produtoService.consultar(req.body.codigo);
    if (produto == null) {
      res.status(405).json({ Erros: "Produto nao encontrado" });
    }
    produto = await Atualizar(codigo, descricao, preco);
    res.status(200).json(produto);
  } catch (erro) {}
});

app.post(
  "/produto",

  async (req, res) => {
    //const erros = validationResult(req)
    if (!req.body.codigo || !req.body.descricao || !req.body.preco) {
      return res.status(400).json({ Erros: "Parametros obrigatorios" });
    }
    try {
      let produto = await produtoService.consultar(req.body.codigo);
      if (produto == null) {
        produto = await produtoService.Criar(
          req.body.codigo,
          req.body.descricao,
          req.body.preco
        );
      } else {
        produto = await produtoService.Atualizar(
          req.body.codigo,
          req.body.descricao,
          req.body.preco
        );
        return res.status(200).json(produto);
      }
      return res.status(201).json(produto);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);
app.delete("/produto/:id", async (req, res) => {
  //const erros = validationResult(req)
  if (!req.params.id) {
    return res.status(400).json({ Erros: "Parametros obrigatorios" });
  }
  try{
    const produto = await produtoService.DeletarRegistro(req.params.id)
    return res.status(200).json(produto);
  }catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
});
app.get("/", async (req, res) => {
  res.status(200).json(await produtoService.RetornarTodos());
});

module.exports = app;
