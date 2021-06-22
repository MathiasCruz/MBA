import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { DAYS_OF_WEEK } from './dateFunctions';
import { ICalendarCell, IEvent, INewEvent } from '../Backend/backend';
import { Box, Icon } from '@material-ui/core';
import React from 'react';

interface IcalendarProps {
  weeksGen: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (evt: IEvent) => void;
}

export default function Calendar(props: IcalendarProps) {
  const { weeksGen } = props;
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
  function handleClickCell(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  }

  const classes = useStyles();
  return (
    <TableContainer
      style={{ flex: '1' }}
      className={classes.root}
      component={'div'}
    >
      <Table className={classes.table} size="small" aria-label="a dense table">
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
                  <TableCell
                    key={cell.date}
                    component="th"
                    scope="row"
                    onClick={me => handleClickCell(me, cell.date)}
                  >
                    <div className={classes.dayOfWeek}>{cell.dayOfTheWeek}</div>
                    {cell.events.map(event => {
                      const color = event.calendar.color;
                      return (
                        <button
                          key={event.id}
                          className={classes.event}
                          onClick={() => props.onClickEvent(event)}
                        >
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
  );
}
