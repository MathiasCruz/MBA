import express from 'express';
import pedidosRouter from './routes/pedidos.js';

const app = express();
app.use(express.json());
app.use('/pedidos', pedidosRouter);
global.filename = 'pedidos.json';
app.listen(3000, async () => {
  try {
    console.log('Api iniciada');
  } catch (err) {
    console.log('Erro ao iniciar :' + err);
  }
});
