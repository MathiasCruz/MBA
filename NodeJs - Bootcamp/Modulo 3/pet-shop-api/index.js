import express from 'express';
import cors from 'cors';
import proprietarioRouter from './routes/proprietario.route.js';
import animalRouter from './routes/animal.route.js';
import servicoRouter from './routes/servico.route.js';
import postRouter from './routes/post.route.js';
import comentarioRouter from './routes/comentario.route.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/proprietario', proprietarioRouter);
app.use('/animal', animalRouter);
app.use('/servico', servicoRouter);
app.use('/post', postRouter);
app.use('/comentario', comentarioRouter);
app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});
app.listen(3000, () => console.log('Api iniciada'));
