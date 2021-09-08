import proprietarioRepository from '../repository/proprietario.repository.js';

async function createProprietario(proprietario) {
  return await proprietarioRepository.insertProprietario(proprietario);
}

async function updateProprietario(proprietario) {
  return await proprietarioRepository.updateProprietario(proprietario);
}
async function deleteProprietario(id) {
  await proprietarioRepository.deleteProprietario(id);
}
async function getProprietarios() {
  return await proprietarioRepository.getAllProprietario();
}
async function getProprietario(id) {
  return await proprietarioRepository.getProprietario(id);
}
export default {
  createProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietario,
  getProprietarios,
};
