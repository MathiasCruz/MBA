import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscaDespesas } from '../Backend/ChamadasAPI';
import SelectMaterial from '../Components/SelectMaterial';
import SimpleTabs from '../Components/TabOption';
import { ICategoriaValor } from '../Interfaces/ICategoriaValor';
import { IDespesa } from '../Interfaces/IDespesas';
import { Params } from '../Types/MesIso';

export default function DespesasPage() {
  const { mes: mesIso } = useParams<Params>();
  const [ano, mes] = mesIso.split('-');
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  function returnAllCategories(obj: IDespesa[]) {
    return obj
      .map(search => {
        return search.categoria;
      })
      .filter(unique);
  }
  function retornaValorTotalPorCategoria(filtro: string[]) {
    let acumulador: number = 0;
    const NovoFiltro = filtro
      .map(despesa => {
        return despesas
          .filter((a, i, b) => a.categoria === despesa)
          .map((despesaFiltrada, index) => {
            let valorTotal: number =
              index === 0
                ? (acumulador = despesaFiltrada.valor)
                : (acumulador += despesaFiltrada.valor);
            return { categorias: despesaFiltrada.categoria, valorTotal };
          });
      })
      .filter((atual, i, despesaArray) => {
        return despesaArray.lastIndexOf(atual);
      });
    return NovoFiltro;
  }
  function unique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }
  useEffect(() => {
    buscaDespesas(mesIso).then(setDespesas);
  }, [mesIso]);
  if (despesas) {
    const filtroCategorias = returnAllCategories(despesas);
    const filtro = retornaValorTotalPorCategoria(filtroCategorias);
    console.log(filtro);
    return (
      <Container maxWidth="sm">
        <SelectMaterial ano={ano} mes={mes} />
        <SimpleTabs despesas={despesas} />
      </Container>
    );
  } else {
    return <div>Carregando</div>;
  }
}
