import Servico from '../models/servicos.model.js';
import Animal from '../repository/animal.repository.js';

async function createServico(servico) {
  try {
    return await Servico.create(servico);
  } catch (err) {
    throw err;
  }
}

async function getAllServices() {
  try {
    return await Servico.findAll();
  } catch (err) {
    throw err;
  }
}

async function getServicesByAnimal(id) {
  try {
    return await Servico.findAll({ where: { animalId: id }, raw: true });
  } catch (err) {
    throw err;
  }
}
async function getServiceByOwner(id) {
  try {
    let servicos = [];
    let animais = await Animal.getAllAnimalsByOwner(id);
    if (!animais) {
      throw new Error('Esse proprietario nao tem animais cadastrados');
    }
    for (let i = 0; i < animais.length; i++) {
      let servicoPrestado = await getServicesByAnimal(animais[i].animalId);
      if (servicoPrestado.length > 0) {
        servicos.push(servicoPrestado);
      }
    }

    return servicos;
  } catch (err) {
    throw err;
  }
}
export default { createServico, getAllServices, getServiceByOwner };
