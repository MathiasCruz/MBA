import express from 'express'
import produtoRouter from "./routes/produto.route.js"
import pedidoRouter from "./routes/pedido.route.js"
import clienteRouter from "./routes/cliente.route.js"
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/produto", produtoRouter);
app.use("/pedido", pedidoRouter);
app.use("/cliente",clienteRouter)

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).send({ error: err.message });
});

export default app;