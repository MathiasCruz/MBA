import React, { useReducer } from 'react';
import Box from '@material-ui/core/Box';
import {
  GetCalendars,
  GetEvents,
  ICalendar,
  ICalendarCell,
  IcalendarScreenState,
  IEvent,
  IEventWithCalendar,
} from '../Backend/backend';
import { useEffect } from 'react';
import { DAYS_OF_WEEK, GetToday } from './dateFunctions';
import { useParams } from 'react-router-dom';
import { CalendarsView } from './CalendarsView';
import { CalendarsHeader } from './CalendarsHeader';
import { Calendar } from './Calendar';
import { Button } from '@material-ui/core';
import EventDialogForm from './EventDialogForm';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { reducer } from './CalendarReduce';

export default function DenseTable() {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    calendars: [],
    calendarsSelected: [],
    newEvent: null,
  });
  const { date } = useParams<{ date: string }>();
  const { events, calendars, calendarsSelected, newEvent } = state;

  const weeksGen = useMemo(() => {
    return GenerateCalendar(date + '-01', events, calendars, calendarsSelected);
  }, [date, events, calendars, calendarsSelected]);

  const firtDate = weeksGen[0][0].date;
  const lastDate = weeksGen[weeksGen.length - 1][6].date;

  useEffect(() => {
    Promise.all([GetCalendars(), GetEvents(firtDate, lastDate)]).then(
      ([calendars, events]) => {
        dispatch({ type: 'load', payLoad: { events, calendars } });
      }
    );
  }, [firtDate, lastDate]);

  function refreshScreen() {
    GetEvents(firtDate, lastDate).then(events =>
      dispatch({ type: 'load', payLoad: { events } })
    );
  }

  const CloseDialog = useCallback(() => {
    dispatch({ type: 'closeDialog' });
  }, []);

  function GenerateCalendar(
    date: string,
    AllEvents: IEvent[],
    calendars: ICalendar[],
    calendarsSelected: boolean[]
  ): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate = new Date(date + 'T12:00:00');
    const currentMonth = jsDate.getMonth();
    const currentDay = new Date(jsDate.valueOf());
    currentDay.setDate(1);
    const dayOfWeek = currentDay.getDay();
    currentDay.setDate(1 - dayOfWeek);

    do {
      const week: ICalendarCell[] = [];
      for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
        const monthStr = (currentDay.getMonth() + 1)
          .toString()
          .padStart(2, '0');
        const dayStr = currentDay.getDate().toString().padStart(2, '0');
        const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;
        const events: IEventWithCalendar[] = [];
        for (const event of AllEvents) {
          if (event.date === isoDate) {
            const callIndex = calendars.findIndex(
              cal => cal.id === event.calendarId
            );
            if (calendarsSelected[callIndex]) {
              events.push({ ...event, calendar: calendars[callIndex] });
            }
          }
        }
        week.push({
          date: isoDate,
          events: events,
          dayOfTheWeek: currentDay.getDate(),
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
    } while (currentDay.getMonth() === currentMonth);
    return weeks;
  }

  return (
    <Box height="100%" display="flex" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: 'new', payload: GetToday() })}
        >
          Novo Evento
        </Button>
        <h3>Agenda</h3>
        <CalendarsView
          calendars={calendars}
          dispatch={dispatch}
          calendarSelected={calendarsSelected}
        />
      </Box>
      <Box display="flex" flex="1" flexDirection="column">
        <CalendarsHeader month={date} />
        <Calendar weeksGen={weeksGen} dispatch={dispatch} />
        <EventDialogForm
          openDialog={newEvent}
          OnClose={CloseDialog}
          calendar={calendars}
          OnSave={() => {
            dispatch({ type: 'closeDialog' });
            refreshScreen();
          }}
        />
      </Box>
    </Box>
  );
}
