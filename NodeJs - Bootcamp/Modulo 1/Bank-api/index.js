import express from 'express';
import { promises as fs } from 'fs';
import accountRouter from './routes/account.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/account', accountRouter);
app.use(cors());

global.filename = 'accounts.json';
const { readFile, writeFile } = fs;

app.listen(3000, async () => {
  try {
    await readFile(global.filename);
    console.log('Api iniciada');
  } catch (err) {
    const initialJson = { netxId: 1, accounts: [] };

    writeFile(global.filename, JSON.stringify(initialJson))
      .then(() => {
        console.log('Api iniciada e criado arquivo');
      })
      .catch(err => {
        console.log(err);
      });
  }
});
