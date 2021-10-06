const request = require("supertest");
const app = require("../index.js");
const db = require("../repository/db");
describe("Testes de Integração", () => {
  afterAll(async () => await db.close());

  const clienteJson = {
    nome: "Mathias",
    email: "MAthias@gmail.com",
    senha: "123456",
    telefone: "12331155",
    endereco: "Brasilia",
  };

  test("01 - Post de cliente", async () => {
    const res = await request(app)
      .post("/cliente")
      .set("Authorization", "Basic YWRtaW46ZGVzYWZpby1pZ3RpLW5vZGVqcw==")
      .send(clienteJson);
    expect(res.status).toBe(200);
  });
  test("02 - Atualizar Cliente", async () => {
    const clienteJsonAtualizacao = {
      id: "1",
      nome: "Gabiru Cruz",
      email: "MAthias@gmail.com",
      senha: "123456",
      telefone: "12331155",
      endereco: "Brasilia",
    };
    const res = await request(app).put("/cliente").send(clienteJsonAtualizacao);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(clienteJsonAtualizacao);
  });
  test("03 - Post de Autor", async () => {
    const autorPayload = {
      nome: "Hp lovecraft",
      email: "livrariaTop@gmail.com",
      telefone: "12331155",
    };
    const res = await request(app).post("/autor").send(autorPayload);
    expect(res.status).toBe(200);
  });
  test("04 - post de livro", async () => {
    const livroPayload = {
      nome: "Chamado de chucthcullu",
      valor: 10.05,
      estoque: 25,
      autor_id: 1,
    };
    const res = await request(app).post("/livro").send(livroPayload);
    expect(res.status).toBe(200);
  });

  test("05 - post de vendas", async () => {
    const vendaPayload = {
      valor: 10.05,
      data: "20211010",
      livro_livro_id: 1,
      cliente_cliente_id: 1,
    };
    const res = await request(app).post("/venda").send(vendaPayload);
    expect(res.status).toBe(200);
  });

  // test("03 - Deletar Cliente",async () => {
  //   const res = await request(app).delete()
  // })
});
