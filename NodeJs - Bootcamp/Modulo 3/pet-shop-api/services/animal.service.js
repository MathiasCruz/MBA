import animalRepository from '../repository/animal.repository.js';

async function createAnimal(animal) {
  return await animalRepository.createAnimal(animal);
}

async function updateAnimal(animal) {
  return await animalRepository.updateAnimal(animal);
}

async function deleteAnimal(id) {
  await animalRepository.deleteAnimal(id);
}

async function getAnimalls(proprietarioId) {
  if (proprietarioId) {
    return await animalRepository.getAllAnimalsByOwner(proprietarioId);
  }
  return await animalRepository.getAllAnimals();
}

async function getAnimal(id) {
  return await animalRepository.getAnimal(id);
}
export default {
  createAnimal,
  updateAnimal,
  getAnimalls,
  getAnimal,
  deleteAnimal,
};
