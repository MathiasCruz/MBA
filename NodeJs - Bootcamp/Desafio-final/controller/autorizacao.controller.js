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
function autorizar(req) {
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64");
  if (login === undefined || password === undefined)
    throw new Error("Login ou senha não informados na autorização");
  const retorno = cliente.BuscarClienteExistente(login, password);
  if (retorno) {
    return true;
  }
  return false;
}
module.exports = { autenticar, autorizar };
