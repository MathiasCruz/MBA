import { IDespesa } from '../Interfaces/IDespesas';
import { IUser } from '../Interfaces/IUser';

export function SignInAPI(email: string, senha: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  }).then(HandleResponse);
}

export function getSessionLogin(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: 'include',
  }).then(HandleResponse);
}
export function buscaDespesas(mes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`, {
    credentials: 'include',
  }).then(HandleResponse);
}

function HandleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  }
  throw new Error(resp.statusText);
}
