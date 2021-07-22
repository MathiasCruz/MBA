import { IPartida } from '../interfaces/IPartidas';

const url = 'http://localhost:3000';
export function BuscaPartidasPorAno(ano: string): Promise<IPartida[]> {
  return fetch(`${url}/${ano}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}
