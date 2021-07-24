import { ICampeonato, IPartida } from '../interfaces/IPartidas';
import { IResultado } from '../interfaces/IResultado';

function CalcularResultadoCampeonato(
  time: string,
  campeonato: ICampeonato[]
): IResultado {
  let resultado: IResultado = {
    time: '',
    pontos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0,
  };
  resultado.time = time;

  const timeFiltradoVistante = FiltrarResultadosComoVistitante(
    campeonato,
    time
  );
  const ultimoResultado = timeFiltradoVistante;
  if (ultimoResultado) {
    resultado.time = ultimoResultado.visitante;
    resultado.pontos = ultimoResultado.pontuacao_geral_visitante.total_pontos;
    resultado.vitorias =
      ultimoResultado.pontuacao_geral_visitante.total_vitorias;
    resultado.empates = ultimoResultado.pontuacao_geral_visitante.total_empates;
    resultado.derrotas =
      ultimoResultado.pontuacao_geral_visitante.total_derrotas;
    resultado.golsPro =
      ultimoResultado.pontuacao_geral_visitante.total_gols_marcados;
    resultado.golsContra =
      ultimoResultado.pontuacao_geral_visitante.total_gols_sofridos;
    resultado.saldoGols =
      ultimoResultado.pontuacao_geral_visitante.total_gols_marcados -
      ultimoResultado.pontuacao_geral_visitante.total_gols_sofridos;
  }
  return resultado;
}

function FiltrarResultadosComoVistitante(
  campeonato: ICampeonato[],
  time: string
) {
  let timeFiltrado: IPartida[][] = [];
  for (let i = 0; i < campeonato.length; i++) {
    let filtrado = campeonato[i].partidas.filter(
      partida => partida.visitante === time
    );
    if (filtrado.length > 0) {
      timeFiltrado.push(filtrado);
    }
  }
  const ultimoResultado = timeFiltrado[timeFiltrado.length - 1].pop();
  return ultimoResultado;
}
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

export function PreencherResultadoPartida(
  campeonato: ICampeonato[]
): IResultado[] {
  const times = FiltraNomesUnicos(campeonato);
  let resultadosFinais: IResultado[] = [];
  for (let time of times) {
    const resultado = CalcularResultadoCampeonato(time, campeonato);
    if (resultado) resultadosFinais.push(resultado);
  }

  return resultadosFinais.sort(OrdenarTimesPorPontos);
}

function OrdenarTimesPorPontos(timeA: IResultado, timeB: IResultado) {
  if (timeA.pontos < timeB.pontos) return 1;
  if (timeA.pontos > timeB.pontos) return -1;
  return 0;
}
