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
    return obj.map(search => {
      return [search.categoria, search.valor];
    });
  }
  function unique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }
  useEffect(() => {
    buscaDespesas(mesIso).then(setDespesas);
  }, [mesIso]);
  if (despesas) {
    const filtroCategorias = returnAllCategories(despesas);
    console.log(filtroCategorias);
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
