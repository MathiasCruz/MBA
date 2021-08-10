import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  try {
    throw new error('erro teste');
  } catch (err) {
    next(err);
  }
});

//Tratamento de erro Assincrono
app.post('/', async (req, res, next) => {
  try {
    throw new error('erro teste');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log('erro 1');
  res.status(500).send('Ocorreu um erro');
});
app.listen(3000, () => {
  console.log('Api iniciada');
});
