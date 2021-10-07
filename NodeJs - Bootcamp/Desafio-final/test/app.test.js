const request = require("supertest");
const app = require("../index.js");
const db = require("../repository/db");
const auth = require("../controller/autorizacao.controller.js");
describe("Testes de Integração", () => {
  afterAll(async () => await db.close());

  const clienteJson = {
    nome: "Jamil",
    email: "jamil@gmail.com",
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
      email: "Jamil@gmail.com",
      senha: "123456",
      telefone: "12331155",
      endereco: "Brasilia",
    };
    const res = await request(app)
      .put("/cliente")
      .set("Authorization", "Basic YWRtaW46ZGVzYWZpby1pZ3RpLW5vZGVqcw==")
      .send(clienteJsonAtualizacao);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(clienteJsonAtualizacao);
  });
  test("03 - Post de Autor", async () => {
    const autorPayload = {
      nome: "Hp lovecraft",
      email: "livrariaTop@gmail.com",
      telefone: "12331155",
    };
    const res = await request(app)
      .post("/autor")
      .set("Authorization", "Basic YWRtaW46ZGVzYWZpby1pZ3RpLW5vZGVqcw==")
      .send(autorPayload);
    expect(res.status).toBe(200);
  });
  test("04 - post de livro", async () => {
    const livroPayload = {
      nome: "Chamado de chucthcullu",
      valor: 10.05,
      estoque: 25,
      autor_id: 1,
    };
    const res = await request(app)
      .post("/livro")
      .set("Authorization", "Basic YWRtaW46ZGVzYWZpby1pZ3RpLW5vZGVqcw==")
      .send(livroPayload);
    expect(res.status).toBe(200);
  });

  test("05 - get de livro", async () => {
    const parameters = auth.criarBasicBase64(
      clienteJson.email,
      clienteJson.senha
    );
    console.log(parameters);
    const res = await request(app)
      .get("/livro/2")
      .set("Authorization", parameters)
      .send();
    expect(res.status).toBe(200);
  });
  test("06 - post de vendas", async () => {
    const vendaPayload = {
      valor: 10.05,
      data: "20211010",
      livro_livro_id: 2,
      cliente_cliente_id: 1,
    };
    const res = await request(app)
      .post("/venda")
      .set(
        "Authorization",
        auth.criarBasicBase64(clienteJson.email, clienteJson.senha)
      )
      .send(vendaPayload);
    expect(res.status).toBe(200);
  });

  // test("03 - Deletar Cliente",async () => {
  //   const res = await request(app).delete()
  // })
});
