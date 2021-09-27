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

export interface IUser {
  name: string;
  email: string;
}
export interface ImenuUserProps {
  OnSignOut: () => void;
}

export interface IAuthContext {
  user: IUser;
  OnSignOut: () => void;
}
export interface ICalendarheaderPros {
  month: string;
}
export interface IcalendarScreenState {
  calendars: ICalendar[];
  events: IEvent[];
  calendarsSelected: boolean[];
  newEvent: INewEvent | null;
}
export interface ILoginScreenProps {
  onSignin: (user: IUser) => void;
}
export function GetCalendars(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars', {
    credentials: 'include',
  }).then(HandleResponse);
}

export function GetEvents(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort(date,time)`,
    {
      credentials: 'include',
    }
  ).then(HandleResponse);
}

export function CreateEvents(newEvent: INewEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  }).then(HandleResponse);
}
export function UpdateEvents(updatedEvent: INewEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events/${updatedEvent.id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEvent),
  }).then(HandleResponse);
}

export function DeletEvents(eventId: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(HandleResponse);
}

export function getSessionLogin(): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/user`, {
    credentials: 'include',
  }).then(HandleResponse);
}
export function SignIn(email: string, password: string): Promise<IUser> {
  return fetch(`http://localhost:8080/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(HandleResponse);
}

export function SignOut(): Promise<void> {
  return fetch(`http://localhost:8080/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  }).then(HandleResponse);
}

function HandleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  }
  throw new Error(resp.statusText);
}
