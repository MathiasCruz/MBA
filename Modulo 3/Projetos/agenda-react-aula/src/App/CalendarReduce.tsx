import { ICalendar, IcalendarScreenState, IEvent } from '../Backend/backend';

export type ICalendarScreenAction =
  | {
      type: 'load';
      payLoad: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | {
      type: 'edit';
      payload: IEvent;
    }
  | {
      type: 'closeDialog';
    }
  | {
      type: 'new';
      payload: string;
    }
  | {
      type: 'toogleCalendar';
      payload: number;
    };

export function reducer(
  state: IcalendarScreenState,
  action: ICalendarScreenAction
) {
  switch (action.type) {
    case 'load':
      const calendars = action.payLoad.calendars ?? state.calendars;
      const selected = action.payLoad.calendars
        ? action.payLoad.calendars.map(() => true)
        : state.calendarsSelected;
      return {
        ...state,
        events: action.payLoad.events,
        calendars,
        calendarsSelected: selected,
      };
    case 'edit':
      return { ...state, newEvent: action.payload };
    case 'closeDialog':
      return { ...state, newEvent: null };
    case 'new': {
      return {
        ...state,
        newEvent: {
          date: action.payload,
          desc: '',
          calendarId: state.calendars[0].id,
        },
      };
    }
    case 'toogleCalendar': {
      const calendarsSelected = [...state.calendarsSelected];
      calendarsSelected[action.payload] = !calendarsSelected[action.payload];
      return { ...state, calendarsSelected };
    }
    default:
      return state;
  }
}
