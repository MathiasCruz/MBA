export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IDialogFormProps {
  openDialog: INewEvent | null;
  calendar: ICalendar[];
  OnClose: () => void;
}

export interface INewEvent {
  id?: number;
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
export type IEventWithCalendar = IEvent & { calendar: ICalendar };
export interface ICalendarCell {
  date: string;
  events: IEventWithCalendar[];
  dayOfTheWeek: number;
}

export function GetCalendars(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars').then(resp => {
    return resp.json();
  });
}

export function GetEvents(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort(date,time)`
  ).then(resp => {
    return resp.json();
  });
}
