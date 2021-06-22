import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  GetCalendars,
  GetEvents,
  ICalendar,
  ICalendarCell,
  IEvent,
  IEventWithCalendar,
  INewEvent,
} from '../Backend/backend';
import { useEffect } from 'react';
import { DAYS_OF_WEEK, GetToday } from './dateFunctions';
import { useParams } from 'react-router-dom';
import CalendarsView from './CalendarsView';
import CalendarsHeader from './CalendarsHeader';
import Calendar from './Calendar';
import { Button } from '@material-ui/core';
import EventDialogForm from './EventDialogForm';

export default function DenseTable() {
  const { date } = useParams<{ date: string }>();
  const [newEvent, setNewEvent] = useState<INewEvent | null>(null);
  console.log(date);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
  const weeksGen = GenerateCalendar(
    date + '-01',
    events,
    calendars,
    calendarsSelected
  );

  const firtDate = weeksGen[0][0].date;
  const lastDate = weeksGen[weeksGen.length - 1][6].date;
  useEffect(() => {
    Promise.all([GetCalendars(), GetEvents(firtDate, lastDate)]).then(
      ([calendars, events]) => {
        setCalendarsSelected(calendars.map(() => true));
        setCalendars(calendars);
        setEvents(events);
      }
    );
  }, [firtDate, lastDate]);

  function ToogleCalendar(index: number) {
    const newSelectedCalendar = [...calendarsSelected];
    newSelectedCalendar[index] = !newSelectedCalendar[index];
    setCalendarsSelected(newSelectedCalendar);
  }
  function refreshScreen() {
    GetEvents(firtDate, lastDate).then(setEvents);
  }

  function openNewEvent(date: string) {
    setNewEvent({ date, desc: '', calendarId: calendars[0].id });
  }
  function UpdateNewEvent(evt: IEvent) {
    setNewEvent(evt);
  }

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
          onClick={() => openNewEvent(GetToday())}
        >
          Novo Evento
        </Button>
        <h3>Agenda</h3>
        <CalendarsView
          calendars={calendars}
          toogleCalendar={ToogleCalendar}
          calendarSelected={calendarsSelected}
        />
      </Box>
      <Box display="flex" flex="1" flexDirection="column">
        <CalendarsHeader month={date} />
        <Calendar
          weeksGen={weeksGen}
          onClickDay={openNewEvent}
          onClickEvent={UpdateNewEvent}
        />
        <EventDialogForm
          openDialog={newEvent}
          OnClose={() => setNewEvent(null)}
          calendar={calendars}
          OnSave={() => {
            setNewEvent(null);
            refreshScreen();
          }}
        />
      </Box>
    </Box>
  );
}
