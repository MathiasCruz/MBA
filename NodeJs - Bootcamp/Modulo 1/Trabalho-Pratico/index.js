import express from 'express';
import carRouter from './carsRoute.js';

const app = express();
app.use(express.json());
app.use('/marcas', carRouter);
global.filename = 'car-list.json';

app.listen(3000, () => {
  console.log('Api iniciada');
});
