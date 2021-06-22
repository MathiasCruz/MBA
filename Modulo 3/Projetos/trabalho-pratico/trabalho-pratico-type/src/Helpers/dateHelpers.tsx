import { IDespesas } from '../Interfaces/IDespesas';

export function GetActualYearMonth(): string {
  const actualDate = new Date();
  const year = actualDate.getFullYear();
  const month = actualDate.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, '0')}`;
}

export const MONTHS_OF_YEAR = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function monthFormatterString(isoMonth: string): string {
  const newDate = new Date(isoMonth + '-01T12:00:00');
  const month = newDate.getMonth();
  return MONTHS_OF_YEAR[month];
}
