import React, { useEffect, useState } from 'react';
import { BuscaPartidasPorAno } from '../api/backend';
import { PreencherResultadoPartida } from '../api/CalculoCampeonato';
import Container from '../components/Container';
import { IResultado } from '../interfaces/IResultado';
import { Menu } from '../components/Menu';

function TelaPartidas() {
  const [campeonato, setCampeonato] = useState<IResultado[]>();

  useEffect(() => {
    BuscaPartidasPorAno('2003').then(function (value) {
      setCampeonato(PreencherResultadoPartida(value));
    });
  }, []);

  if (campeonato) {
    console.log(campeonato);
    return (
      <>
        <Container></Container>
      </>
    );
  } else {
    return <div>Carregando</div>;
  }
}
export default TelaPartidas;
