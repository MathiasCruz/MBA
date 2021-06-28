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

export function getNewUrl(year: string, month: string): string {
  const fomatted = month.padStart(2, '0');
  return `/despesas?mes=${year}-${fomatted}&_sort=01`;
}
