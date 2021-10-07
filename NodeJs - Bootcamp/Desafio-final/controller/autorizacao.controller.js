const cliente = require("../service/cliente.service.js");
function autenticar(req) {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login == "admin" && password == "desafio-igti-nodejs") {
    return true;
  }
  return false;
}
async function autorizar(req) {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login === undefined || password === undefined) {
    throw new Error("Login ou senha não informados na autorização");
  }
  const retorno = await cliente.BuscarClienteExistente(login, password);
  if (req.query.clienteId) {
    if (req.query.clienteId === retorno.clienteId) {
      return true;
    }
    return false;
  }
  if (retorno) {
    return true;
  }
  return false;
}

function criarBasicBase64(usuario, senha) {
  const autenticacao = usuario + ":" + senha;
  const authBase64 = Buffer.from(autenticacao).toString("base64");
  return "Basic " + authBase64;
}
module.exports = { autenticar, autorizar, criarBasicBase64 };
