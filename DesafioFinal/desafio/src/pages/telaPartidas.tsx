import { useEffect, useState } from 'react';
import { BuscaPartidasPorAno } from '../api/backend';
import { ICampeonato, IPartida } from '../interfaces/IPartidas';
import { IResultado, Resultado } from '../interfaces/IResultado';

function TelaPartidas() {
  const [campeonato, setCampeonato] = useState<ICampeonato[]>();

  useEffect(() => {
    BuscaPartidasPorAno('2003').then(setCampeonato);
  }, []);

  function FiltraNomesUnicos(campeonato: ICampeonato[]) {
    let times: string[] = [];
    for (let i = 0; i < campeonato.length; i++) {
      for (let j = 0; j < campeonato[i].partidas.length; j++) {
        if (times.length === 0) {
          times.push(campeonato[i].partidas[j].mandante);
        } else if (times.indexOf(campeonato[i].partidas[j].mandante) === -1) {
          times.push(campeonato[i].partidas[j].mandante);
        }
      }
    }
    return times;
  }

  function PreencherResultadoPartida(
    times: string[],
    campeonato: ICampeonato[]
  ) {
    let timesFiltrados = times.map(time => {
      return CalcularResultadoCampeonato(time, campeonato);
    });
  }

  if (campeonato) {
    console.log(FiltraNomesUnicos(campeonato));
    return (
      <>
        <div>Testes</div>
      </>
    );
  } else {
    return <div>Carregando</div>;
  }
}
export default TelaPartidas;

function CalcularResultadoCampeonato(time: string,campeonato: ICampeonato[]): IResultado 
{
  let resultado:IResultado = { time:'',
    pontos: 0,
    vitorias:0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0};
  resultado.time = time;

  return resultado;
}
