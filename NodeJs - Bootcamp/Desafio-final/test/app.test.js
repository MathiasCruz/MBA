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
    const res = await request(app).post("/cliente").send(clienteJson);
    expect(res.status).toBe(200);
  });
  test("02 - Atualizar Cliente", async () => {
    const clienteJsonAtualizacao = {
      id: "2",
      nome: "Gabiru Cruz",
      email: "MAthias@gmail.com",
      senha: "123456",
      telefone: "12331155",
      endereco: "Brasilia",
    };
    const res = await request(app).put("/cliente").send(clienteJsonAtualizacao);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(clienteJsonAtualizacao)
  });
  // test("03 - Deletar Cliente",async () => {
  //   const res = await request(app).delete()
  // })
});
