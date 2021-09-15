import ServicoRepository from '../repository/servico.repository.js';

async function createServico(servico) {
  return await ServicoRepository.createServico(servico);
}

async function getAllServices() {
  try {
    return await ServicoRepository.getAllServices();
  } catch (err) {
    throw err;
  }
}

async function getServiceByOwner(id) {
  try {
    return await ServicoRepository.getServiceByOwner(id);
  } catch (err) {
    throw err;
  }
}
export default {
  getAllServices,
  createServico,
  getServiceByOwner,
};
