import { IDespesas } from '../Interfaces/IDespesas';
const url = 'http://localhost:3001/despesas';

export function getFilteredBills(month: string): Promise<IDespesas[]> {
  return fetch(`${url}?mes=${month}&_sort=01`).then(resp => {
    return resp.json();
  });
}

export async function GetAllBillsApi(): Promise<IDespesas[]> {
  return await fetch(url).then(resp => {
    return resp.json();
  });
}
