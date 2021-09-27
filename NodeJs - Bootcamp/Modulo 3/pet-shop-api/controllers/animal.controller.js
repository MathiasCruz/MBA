import animalService from '../services/animal.service.js';

async function createAnimal(req, res, next) {
  try {
    const animal = req.body;
    if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error('Nome, tipo e proprietario_id  são obrigatórios');
    }
    res.send(await animalService.createAnimal(animal));
  } catch (err) {
    next(err);
  }
}
async function updateAnimal(req, res, next) {
  try {
    const animal = req.body;
    if (!animal.nome || !animal.tipo || !animal.animal_id) {
      throw new Error('Nome, tipo e animal_id  são obrigatórios');
    }
    res.send(await animalService.updateAnimal(animal));
  } catch (err) {
    next(err);
  }
}
async function deleteAnimal(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('ID é obrigatório');
    }
    res.end(await animalService.deleteAnimal(id));
  } catch (err) {
    next(err);
  }
}

async function getAnimals(req, res, next) {
  try {
    res.send(await animalService.getAnimalls(req.query.proprietario_id));
  } catch (err) {
    next(err);
  }
}

async function getAnimal(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('ID é obrigatório');
    }
    res.send(await animalService.getAnimal(id));
  } catch (err) {
    next(err);
  }
}
export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimals,
  getAnimal,
};
