import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function createAccount(req, res, next) {
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
}

async function getAccounts(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next();
  }
}

async function getAccount(req, res, next) {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const account = data.accounts.find(
      account => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next();
  }
}

async function deleteAccount(req, res, next) {
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
}

export default {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
};
