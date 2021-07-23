import { IPontuacao } from './IPontuacao';

export interface ICampeonato {
  numero: number;
  partidas: [IPartida];
}
export interface IPartida {
  visitante: string;
  resultado: string;
  data_partida: string;
  pontuacao_geral_mandante: IPontuacao;
  placar_visitante: number;
  hora_partida: string;
  mandante: string;
  placar_mandante: number;
  estadio: string;
  pontuacao_geral_visitante: IPontuacao;
}
