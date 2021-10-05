const express = require("express");
const cors = require("cors");
const clienteRouter = require("./routes/cliente.route.js");
const autorRouter = require("./routes/autor.route.js");
const livroRouter = require("./routes/livro.route.js");
const vendaRouter = require("./routes/venda.route.js");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/cliente", clienteRouter);
app.use("/autor", autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);
app.get("/", async (req, res) => {
  res.status(200).send("Desafio final");
});
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).send({ error: err.message });
});

module.exports = app;
