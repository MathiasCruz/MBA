import Servico from '../models/servicos.model.js';

async function createServico(servico) {
  try {
    return await Servico.create(servico);
  } catch (err) {
    throw err;
  }
}

export default { createServico };
