import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BuscaPartidasPorAno } from '../api/backend';
import { PreencherResultadoPartida } from '../api/CalculoCampeonato';
import Container from '../components/Container';
import { Footer } from '../components/Footer';
import Main from '../components/Main';
import Menu from '../components/Menu';
import Select from '../components/Select';
import Table from '../components/Table';
import { IResultado } from '../interfaces/IResultado';
import { Params } from '../types/Params';

const TelaPartidas: React.FC = () => {
  const [campeonato, setCampeonato] = useState<IResultado[]>();
  const { ano } = useParams<Params>();
  useEffect(() => {
    BuscaPartidasPorAno(ano).then(function (value) {
      setCampeonato(PreencherResultadoPartida(value));
    });
  }, [ano]);

  if (campeonato) {
    console.log(campeonato);

    return (
      <>
        <Container>
          <Menu> React Desafio Final</Menu>
          <Select />
          <Main>
            <Table Resultados={campeonato} />
          </Main>
          <Footer> Rodapé </Footer>
        </Container>
      </>
    );
  } else {
    return <div>Carregando</div>;
  }
};
export default TelaPartidas;
