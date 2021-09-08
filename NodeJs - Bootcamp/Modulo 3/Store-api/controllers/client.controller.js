import clientService from '../services/client.service.js';
async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error('Name, cpf, phone, email, address são obrigatórios');
    }
    res.send(await clientService.createClient(client));
    global.logger.info(`Post/client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await clientService.getClients());
    global.logger.info(`GET/clients`);
  } catch (err) {
    next(err);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await clientService.getClient(req.params.id));
    global.logger(`GET/ CLIENT `);
  } catch (err) {
    next(err);
  }
}
async function deleteClient(req, res, next) {
  try {
    res.end(await clientService.deleteClient(req.params.id));
    global.logger(`DELETE/ client `);
  } catch (err) {
    next(err);
  }
}
async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.client_id ||
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error('ID,Name, cpf, phone, email, address são obrigatórios');
    }
    let updated = res.send(await clientService.updateClient(client));
    global.logger.info(`PUT/client - ${JSON.stringify(updated)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
