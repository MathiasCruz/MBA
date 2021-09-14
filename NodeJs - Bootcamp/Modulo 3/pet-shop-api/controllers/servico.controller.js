import ServicoService from '../services/servico.service.js';

async function createService(req, res, next) {
  try {
    const servico = req.body;
    if (!servico.descricao || !servico.animalId || !servico.valor) {
      throw new Error('Descricao, animal id e valor são obrigatórios');
    }
    res.send(await ServicoService.createServico(servico));
  } catch (err) {
    next(err);
  }
}

export default { createService };
