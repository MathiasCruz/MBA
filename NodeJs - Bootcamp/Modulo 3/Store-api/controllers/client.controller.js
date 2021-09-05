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

export default { createClient };
