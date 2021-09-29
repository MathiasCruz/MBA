const request = require("supertest");
const app = require("../src/app.js");
const db = require("../src/db");

describe("testes de integracao", () => {
  afterAll(async () => await db.sequelize.close());

  const produtoTeste = {
    codigo: "22",
    descricao: "ps5",
    preco: 4000,
  };

  test("responder na raiz", () => {
    return request(app)
      .get("/")
      .then((res) => expect(res.status).toBe(200));
  });

  test("CENÁRIO 02 - post ", async () => {
    const res = await request(app).post("/produto").send(produtoTeste);

    const produto = await db.produto.findOne({
      where: { Codigo: produtoTeste.codigo },
    });
    expect(produto.Codigo).toBe(produtoTeste.codigo);
    expect(res.status).toBe(201);
  });

  test("CENARIO 03 - ATUALIZAR VIA POST", async () => {
    produtoTeste.descricao = "Iphone 13 novo em folhaa";
    const res = await request(app).post("/produto").send(produtoTeste);
    expect(res.status).toBe(200);
  });

  test("CENARIO 4 deletar ", async () => {
    const res = await request(app).delete(`/produto/${produtoTeste.codigo}`)
    const produto = await db.produto.findOne({
      where: { Codigo: produtoTeste.codigo },
    });
    expect(produto).toBeNull()
    expect(res.status).toBe(200);
  });
});
