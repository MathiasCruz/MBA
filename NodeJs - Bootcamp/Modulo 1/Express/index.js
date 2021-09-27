import express from 'express';
import carrosRouter from './carrosRouter';
const app = express();
app.use(express.json);

app.use('/carros', carrosRouter);
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Api Startada');
});
