import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isTemplateExpression } from 'typescript';
import { buscaDespesas } from '../Backend/ChamadasAPI';
import SelectMaterial from '../Components/SelectMaterial';
import SimpleTabs from '../Components/TabOption';
import { ICategoriaValor } from '../Interfaces/ICategoriaValor';
import { IDespesa } from '../Interfaces/IDespesas';
import { IDespesasFiltrado } from '../Interfaces/ISimpleTabsProps';
import { Params } from '../Types/MesIso';

export default function DespesasPage() {
  const { mes: mesIso } = useParams<Params>();
  const [ano, mes] = mesIso.split('-');
  const [despesas, setDespesas] = useState<IDespesa[]>([]);
  const DespesasFiltradas = useMemo(() => {
    return retornaTudoFiltrado(despesas);
  }, [despesas]);

  function returnAllCategories(obj: IDespesa[]) {
    return obj
      .map(search => {
        return search.categoria;
      })
      .filter(unique);
  }
  function CategoriaAndValues(obj: IDespesa[]) {
    return obj.map(search => {
      return { categoria: search.categoria, valor: search.valor };
    });
  }
  function retornaValorTotalPorCategoria(
    categoriaEValor: ICategoriaValor[],
    categorias: string[]
  ) {
    const filtrado = categorias.map(categoria => {
      let acumulador: number = 0;
      return categoriaEValor.reduce((before, actual) => {
        return {
          categoria,
          valor:
            categoria === actual.categoria
              ? (acumulador += actual.valor)
              : (acumulador += 0),
        };
      });
    });

    return filtrado;
  }
  function buscarTotalDespesMes(obj: ICategoriaValor[]): number {
    let total: number = 0;
    for (let item of obj) {
      total += item.valor;
    }
    return total;
  }
  function retornaTudoFiltrado(despesasMes: IDespesa[]): IDespesasFiltrado {
    const filtroCategorias = returnAllCategories(despesasMes);
    const filtrosComValor = CategoriaAndValues(despesasMes);
    const categoriaEValor = retornaValorTotalPorCategoria(
      filtrosComValor,
      filtroCategorias
    );
    const valorTotal: number = buscarTotalDespesMes(categoriaEValor);
    return { despesasMes, categoriaEValor, valorTotal };
  }
  function unique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    buscaDespesas(mesIso).then(setDespesas);
  }, [mesIso]);

  if (despesas) {
    console.log(DespesasFiltradas);
    return (
      <Container maxWidth="sm">
        <SelectMaterial ano={ano} mes={mes} />
        <SimpleTabs
          despesasMes={DespesasFiltradas.despesasMes}
          valorTotal={DespesasFiltradas.valorTotal}
          categoriaEValor={DespesasFiltradas.categoriaEValor}
        />
      </Container>
    );
  } else {
    return <div>Carregando</div>;
  }
}
