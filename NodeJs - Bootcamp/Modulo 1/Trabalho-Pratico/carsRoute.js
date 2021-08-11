import express from 'express';
import { promises as fs } from 'fs';

const Router = express.Router();
const { readFile, writeFile } = fs;

Router.get('/maisModelos', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const maisModelos = RetornarMarcaComMaisModelos(data);
    const mesmoNumeroDeModelos = RetornarMarcasQuantidadesIguais(
      maisModelos,
      data
    );

    if (mesmoNumeroDeModelos) {
      res.send(JSON.stringify(mesmoNumeroDeModelos));
    } else {
      res.send(JSON.stringify(maisModelos));
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

Router.get('/menosModelos', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    console.log(data);
    const menosModelos = RetornarMarcaComMenosModelos(data);
    const mesmoNumeroDeModelos = RetornarMarcasQuantidadesIguais(
      menosModelos,
      data
    );

    if (mesmoNumeroDeModelos) {
      res.send(JSON.stringify(mesmoNumeroDeModelos));
    } else {
      res.send(JSON.stringify(menosModelos));
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

Router.post('/listaModelos', async (req, res) => {
  try {
    const param = req.body;
    if (!param.marca) {
      throw new error('Parametro Invalido');
    }
    const data = JSON.parse(await readFile(global.filename));
    const modelos = data.find(item => {
      let itemBrand = item.brand.toLowerCase();
      console.log(itemBrand);
      let marca = param.marca.toLowerCase();
      return itemBrand === marca;
    });

    res.send(JSON.stringify(modelos.models));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
Router.get('/listaMaisModelos/:qtd', async (req, res) => {
  try {
    const quantidade = parseInt(req.params.qtd);
    const data = JSON.parse(await readFile(global.filename));
    const marcasDecrescente =
      RetornarMarcasComMaisModelosEmOrdemDecrescente(data);
    res.send(JSON.stringify(marcasDecrescente.slice(0, quantidade)));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

Router.get('/listaMenosModelos/:qtd', async (req, res) => {
  try {
    const quantidade = parseInt(req.params.qtd);
    const data = JSON.parse(await readFile(global.filename));
    const marcascrescente = RetornarMarcasComMenosModelosEmOrdemCrescente(data);
    res.send(JSON.stringify(marcascrescente.slice(0, quantidade)));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
function RetornarMarcasComMaisModelosEmOrdemDecrescente(jsonCars) {
  const marcasDecrescente = jsonCars
    .map(item => {
      return {
        marca: item.brand,
        quantidades: item.models.length,
      };
    })
    .sort((a, b) => {
      if (a.quantidades > b.quantidades) return -1;
      if (a.quantidades < b.quantidades) return 1;
      if (a.quantidades === b.quantidades) {
        let marcaA = a.marca.toUpperCase();
        let marcaB = b.marca.toUpperCase();
        if (marcaA < marcaB) {
          return -1;
        }
        if (marcaA > marcaB) {
          return 1;
        }
      }
      return 0;
    });

  return marcasDecrescente;
}

function RetornarMarcasComMenosModelosEmOrdemCrescente(jsonCars) {
  const marcasCrescente = jsonCars
    .map(item => {
      return {
        marca: item.brand,
        quantidades: item.models.length,
      };
    })
    .sort((a, b) => {
      if (a.quantidades < b.quantidades) return -1;
      if (a.quantidades > b.quantidades) return 1;
      if (a.quantidades === b.quantidades) {
        let marcaA = a.marca.toUpperCase();
        let marcaB = b.marca.toUpperCase();
        if (marcaA < marcaB) {
          return -1;
        }
        if (marcaA > marcaB) {
          return 1;
        }
      }
      return 0;
    });

  return marcasCrescente;
}

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

function RetornarMarcasQuantidadesIguais(modelos, jsonMarcas) {
  const arrayMarcasIguais = [];
  const empate = jsonMarcas.filter(
    item =>
      item.models.length === modelos.quantidade && item.brand != modelos.marca
  );
  if (empate.length != 0) {
    for (let brands of jsonMarcas) {
      arrayMarcasIguais.push(brands.brand);
    }
    arrayMarcasIguais.push(modelos.marca);
    return arrayMarcasIguais;
  }
  return 0;
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
