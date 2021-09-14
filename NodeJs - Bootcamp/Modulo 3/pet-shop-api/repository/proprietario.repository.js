import Properietario from '../models/proprietario.model.js';

async function insertProprietario(proprietario) {
  try {
    return await Properietario.create(proprietario);
  } catch (err) {
    throw err;
  }
}

async function updateProprietario(proprietario) {
  try {
    await Properietario.update(proprietario, {
      where: { proprietarioId: proprietario.proprietarioId },
    });
    return await getAnimal(proprietario.proprietarioId);
  } catch (err) {
    throw err;
  }
}

async function deleteProprietario(id) {
  try {
    await Proprietario.destroy({
      where: {
        proprietarioId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getAllProprietario() {
  try {
    return await Properietario.findAll();
  } catch (err) {
    throw err;
  }
}

async function getProprietario(id) {
  try {
    return await Properietario.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default {
  insertProprietario,
  updateProprietario,
  deleteProprietario,
  getAllProprietario,
  getProprietario,
};
