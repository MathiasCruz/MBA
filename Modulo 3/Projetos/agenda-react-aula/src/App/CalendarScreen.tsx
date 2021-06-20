import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Icon, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import {
  GetCalendars,
  GetEvents,
  ICalendar,
  ICalendarCell,
  IEvent,
} from '../Backend/backend';
import { useEffect } from 'react';
import { promises } from 'dns';

const useStyles = makeStyles({
  root: { height: '100%' },
  table: {
    borderTop: '1px solid rgb(224,224,224)',
    minHeight: '100%',
    tableLayout: 'fixed',
    '& td ~ td, th ~ th': {
      borderLeft: '1px solid rgb(224,224,224)',
    },
    '&td': {
      verticalAlign: 'top',
      overflow: 'hidden',
      padding: '8px 4px',
    },
  },
  dayOfWeek: { fontWeight: 500, marginBottom: '4px' },
  event: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    marginBottom: '4px 0',
  },
  eventBackground: {
    display: 'inline-block',
    color: 'white',
    padding: '2px',
    borderRadius: '4px',
  },
});

function GenerateCalendar(
  date: string,
  AllEvents: IEvent[],
  calendars: ICalendar[]
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
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, '0');
      const dayStr = currentDay.getDate().toString().padStart(2, '0');
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      week.push({
        date: isoDate,
        events: AllEvents.filter(e => e.date === isoDate).map(e => {
          const calendar = calendars.find(cal => cal.id === e.calendarId)!;
          return { ...e, calendar };
        }),
        dayOfTheWeek: currentDay.getDate(),
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);
  return weeks;
}
function GetToday() {
  return '2021-06-17';
}

function ToogleCalendar(index: number) {}
const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

export default function DenseTable() {
  const classes = useStyles();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
  const weeksGen = GenerateCalendar(GetToday(), events, calendars);
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

  return (
    <Box height="100%" display="flex" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="16em"
        padding="8px 16px"
      >
        <Box marginTop="64px">
          <h2>Agenda React</h2>
          <Button variant="contained" color="primary">
            Novo Evento
          </Button>
          <h3>Agenda</h3>
          {calendars.map((calendar, i) => {
            return (
              <FormControlLabel
                key={calendar.id}
                control={
                  <Checkbox
                    checked={calendarsSelected[i]}
                    onChange={() => ToogleCalendar(i)}
                  />
                }
                label={calendar.name}
              />
            );
          })}
        </Box>
      </Box>
      <TableContainer className={classes.root} component={'div'}>
        <Box display="flex" alignItems="center" padding="8px 16px">
          <IconButton>
            <Icon>chevron_left</Icon>
          </IconButton>
          <IconButton>
            <Icon>chevron_right</Icon>
          </IconButton>
          <Box flex="1" margin-left="16px" component="h3">
            Junho de 2021
          </Box>
          <IconButton>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map(day => {
                return <TableCell key={day}>{day}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeksGen.map((week, id) => {
              return (
                <TableRow key={id}>
                  {week.map(cell => (
                    <TableCell key={cell.date} component="th" scope="row">
                      <div className={classes.dayOfWeek}>
                        {cell.dayOfTheWeek}
                      </div>
                      {cell.events.map(event => {
                        const color = event.calendar.color;
                        return (
                          <button key={event.id} className={classes.event}>
                            {event.time && (
                              <>
                                <Icon fontSize="inherit" style={{ color }}>
                                  watch_later
                                </Icon>
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? (
                              <span>{event.desc}</span>
                            ) : (
                              <span
                                className={classes.eventBackground}
                                style={{ background: color }}
                              >
                                {event.desc}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
