import ServicoRepository from '../repository/servico.repository.js';

async function createServico(servico) {
  return await ServicoRepository.createServico(servico);
}

async function updateServico(servico) {
  try {
    await ServicoRepository.update(servico, {
      where: { servicoId: servico.servicoId },
    });
    return await getServico(servico.servicoId);
  } catch (err) {
    throw err;
  }
}

async function deleteServico(id) {
  try {
    await ServicoRepository.destroy({
      where: {
        servicoId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getAllServico() {
  try {
    return await ServicoRepository.findAll();
  } catch (err) {
    throw err;
  }
}

async function getServico(id) {
  try {
    return await ServicoRepository.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default {
  getServico,
  getAllServico,
  deleteServico,
  updateServico,
  createServico,
};
