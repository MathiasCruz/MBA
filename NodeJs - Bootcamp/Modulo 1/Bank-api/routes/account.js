import express, { json } from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.name || account.balance == null) {
      throw new error('Nome e balance sao obrigatorios');
    }
    const data = JSON.parse(await readFile(global.filename));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next();
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const account = data.accounts.find(
      account => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next();
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));

    data.accounts = data.accounts.filter(
      account => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.end();
  } catch (err) {
    next();
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const account = req.body;
    if (!account.name || account.balance == null || !account.id) {
      throw new error('Nome, balance e ID sao obrigatorios');
    }
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex(item => item.id === account.id);
    if (index === -1) {
      throw new error('Registro não encontrado');
    }
    account = {
      id: req.params.id,
      name: account.name,
      balance: account.balance,
    };

    data.accounts[index] = account;
    await writeFile(global.filename, JSON.stringify(data));
    res.send(account);
  } catch (err) {
    next();
  }
});

router.use((err, req, res, next) => {
  res.status(500).send(err);
});
export default router;
