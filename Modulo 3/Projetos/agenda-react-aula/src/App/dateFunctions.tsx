const MONTHS_OF_YEAR = [
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

export function GetToday() {
  return '2021-06-17';
}

export function AddMonth(isoMonth: string, increment: number): string {
  const newDate = new Date(isoMonth + '-01T12:00:00');
  newDate.setMonth(newDate.getMonth() + increment);
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}

export const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
