import express, { json } from 'express';
import { promises as fs } from 'fs';
import accountController from '../controllers/account.controller.js';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', accountController.createAccount);

router.get('/', accountController.getAccounts);

router.get('/:id', accountController.getAccount);

router.delete('/:id', accountController.deleteAccount);

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
