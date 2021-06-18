import { promises } from 'dns';

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export function GetCalendars(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars').then(resp => {
    return resp.json();
  });
}

export function GetEvents(): Promise<IEvent[]> {
  return fetch('http://localhost:8080/events').then(resp => {
    return resp.json();
  });
}
