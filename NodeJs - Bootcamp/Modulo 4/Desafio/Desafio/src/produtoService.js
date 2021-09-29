const db = require("./db");

const consultar = async (codigo) => {
  let produto = await db.produto.findOne({
    where: { Codigo: codigo },
  });
  return produto;
};

const Criar = async (codigo, descricao, preco) => {
  produto = await db.produto.create({
    Codigo: codigo,
    Descricao: descricao,
    Preco: preco,
  });
  return produto;
};
const Atualizar = async (codigo, descricao, preco) => {
  let produto = await consultar(codigo);
  produto.Descricao = descricao;
  produto.Preco = preco;
  let produtoNovo = await produto.save();
  return produtoNovo;
};
const RetornarTodos = async () => {
  const produtos = await db.produto.findAll();
  return produtos;
};

const DeletarRegistro = async (codigo) => {
  let produto = await consultar(codigo);
  await produto.destroy()
  return produto;
};
module.exports = {
  consultar,
  Criar,
  Atualizar,
  RetornarTodos,
  DeletarRegistro
};
