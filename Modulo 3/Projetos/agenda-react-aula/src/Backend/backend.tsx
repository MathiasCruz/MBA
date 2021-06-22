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
  OnSave: () => void;
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

export interface IValidateEventError {
  [field: string]: string;
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

export function CreateEvents(newEvent: INewEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  }).then(resp => {
    return resp.json();
  });
}
export function UpdateEvents(updatedEvent: INewEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events/${updatedEvent.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEvent),
  }).then(resp => {
    return resp.json();
  });
}

export function DeletEvents(eventId: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    method: 'DELETE',
  }).then(resp => {
    return resp.json();
  });
}
