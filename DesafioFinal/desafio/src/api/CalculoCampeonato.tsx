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
    img: '',
  };
  resultado.time = time;

  const timeFiltradoVistante = FiltrarResultadosComoVistitante(
    campeonato,
    time
  );

  const timeFiltradoMandante = FiltrarResultadosComoMandante(campeonato, time);
  if (timeFiltradoVistante && timeFiltradoMandante) {
    if (
      timeFiltradoMandante.pontuacao_geral_mandante.total_pontos >
      timeFiltradoVistante.pontuacao_geral_visitante.total_pontos
    ) {
      resultado.time = timeFiltradoMandante.mandante;
      resultado.pontos =
        timeFiltradoMandante.pontuacao_geral_mandante.total_pontos;
      resultado.vitorias =
        timeFiltradoMandante.pontuacao_geral_mandante.total_vitorias;
      resultado.empates =
        timeFiltradoMandante.pontuacao_geral_mandante.total_empates;
      resultado.derrotas =
        timeFiltradoMandante.pontuacao_geral_mandante.total_derrotas;
      resultado.golsPro =
        timeFiltradoMandante.pontuacao_geral_mandante.total_gols_marcados;
      resultado.golsContra =
        timeFiltradoMandante.pontuacao_geral_mandante.total_gols_sofridos;
      resultado.saldoGols =
        timeFiltradoMandante.pontuacao_geral_mandante.total_gols_marcados -
        timeFiltradoMandante.pontuacao_geral_mandante.total_gols_sofridos;
    } else {
      resultado.time = timeFiltradoVistante.visitante;
      resultado.pontos =
        timeFiltradoVistante.pontuacao_geral_visitante.total_pontos;
      resultado.vitorias =
        timeFiltradoVistante.pontuacao_geral_visitante.total_vitorias;
      resultado.empates =
        timeFiltradoVistante.pontuacao_geral_visitante.total_empates;
      resultado.derrotas =
        timeFiltradoVistante.pontuacao_geral_visitante.total_derrotas;
      resultado.golsPro =
        timeFiltradoVistante.pontuacao_geral_visitante.total_gols_marcados;
      resultado.golsContra =
        timeFiltradoVistante.pontuacao_geral_visitante.total_gols_sofridos;
      resultado.saldoGols =
        timeFiltradoVistante.pontuacao_geral_visitante.total_gols_marcados -
        timeFiltradoVistante.pontuacao_geral_visitante.total_gols_sofridos;
    }
  }
  resultado.img = removeAcento(resultado.time).replace(' ', '_') + '.png';

  return resultado;
}

function removeAcento(text: string) {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
}

function FiltrarResultadosComoVistitante(
  campeonato: ICampeonato[],
  time: string
) {
  let timeFiltradoVisitante: IPartida[][] = [];
  for (let i = 0; i < campeonato.length; i++) {
    let filtroVisitante = campeonato[i].partidas.filter(
      partida => partida.visitante === time
    );
    if (filtroVisitante.length > 0) {
      timeFiltradoVisitante.push(filtroVisitante);
    }
  }

  const ultimoResultadoVistante =
    timeFiltradoVisitante[timeFiltradoVisitante.length - 1].pop();
  return ultimoResultadoVistante;
}
function FiltrarResultadosComoMandante(
  campeonato: ICampeonato[],
  time: string
) {
  let timeFiltradoMandante: IPartida[][] = [];
  for (let i = 0; i < campeonato.length; i++) {
    let filtromandante = campeonato[i].partidas.filter(
      partida => partida.mandante === time
    );
    if (filtromandante.length > 0) {
      timeFiltradoMandante.push(filtromandante);
    }
  }

  const ultimoResultadoMandante =
    timeFiltradoMandante[timeFiltradoMandante.length - 1].pop();
  return ultimoResultadoMandante;
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
  if (timeA.pontos === timeB.pontos) {
    if (timeA.vitorias > timeB.vitorias) return -1;
    if (timeA.vitorias < timeB.vitorias) return 1;
    if (timeA.vitorias === timeB.vitorias) {
      if (timeA.saldoGols > timeB.saldoGols) return -1;
      if (timeA.saldoGols < timeB.saldoGols) return 1;
      if (timeA.saldoGols === timeB.saldoGols) {
        if (timeA.golsPro > timeB.golsPro) return -1;
        if (timeA.golsPro < timeB.golsPro) return 1;
        if (timeA.golsPro === timeB.golsPro) {
          if (timeA.derrotas > timeB.derrotas) return -1;
          if (timeA.derrotas < timeB.derrotas) return 1;
        }
      }
    }
  }
  return 0;
}
