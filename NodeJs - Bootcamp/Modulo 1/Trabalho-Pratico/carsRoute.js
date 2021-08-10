import express from 'express';
import { promises as fs } from 'fs';

const Router = express.Router();
const { readFile, writeFile } = fs;

Router.get('/maisModelos', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    console.log(data);
    const maisModelos = RetornarMarcaComMaisModelos(data);

    res.send(JSON.stringify(maisModelos));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

Router.get('/menosModelos', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    console.log(data);
    const maisModelos = RetornarMarcaComMenosModelos(data);

    res.send(JSON.stringify(maisModelos));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

function RetornarMarcaComMaisModelos(jsonCars) {
  let maisModelos = {
    marca: '',
    quantidade: 0,
  };
  for (let brands of jsonCars) {
    if (maisModelos.marca === '') {
      maisModelos.marca = brands.brand;
      maisModelos.quantidade = brands.models.length;
    }
    if (brands.models.length > maisModelos.quantidade) {
      maisModelos.marca = brands.brand;
      maisModelos.quantidade = brands.models.length;
    }
  }
  return maisModelos;
}

function RetornarMarcaComMenosModelos(jsonCars) {
  let menosModelos = {
    marca: '',
    quantidade: 0,
  };
  for (let brands of jsonCars) {
    if (menosModelos.marca === '') {
      menosModelos.marca = brands.brand;
      menosModelos.quantidade = brands.models.length;
    }
    if (brands.models.length < menosModelos.quantidade) {
      menosModelos.marca = brands.brand;
      menosModelos.quantidade = brands.models.length;
    }
  }
  return menosModelos;
}
export default Router;
