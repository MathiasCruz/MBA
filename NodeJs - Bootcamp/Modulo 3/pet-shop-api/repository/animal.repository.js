import Animal from '../models/animais.model.js';

async function createAnimal(animal) {
  try {
    return await Animal.create(animal);
  } catch (err) {
    throw err;
  }
}
async function updateAnimal(animal) {
  try {
    await Animal.update(animal, {
      where: { animalId: animal.animalId },
    });
    return await getAnimal(animal.animalId);
  } catch (err) {
    throw err;
  }
}

async function deleteAnimal(id) {
  try {
    await Animal.destroy({
      where: {
        animalId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}
async function getAllAnimals() {
  try {
    return await Animal.findAll();
  } catch (err) {
    throw err;
  }
}

async function getAnimal(id) {
  try {
    return await Animal.findByPk(id);
  } catch (err) {
    throw err;
  }
}
async function getAllAnimalsByOwner(id) {
  try {
    return await Animal.findAll({ where: { proprietarioId: id }, raw: true });
  } catch (err) {
    throw err;
  }
}
export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimal,
  getAllAnimalsByOwner,
};
