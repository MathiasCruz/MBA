import { IDespesa } from './tipos';

export function buscaDespesas(mes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`).then(
    resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(resp.statusText);
      }
    }
  );
}
