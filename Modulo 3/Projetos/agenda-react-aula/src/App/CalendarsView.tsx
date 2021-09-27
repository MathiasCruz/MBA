import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ICalendar } from '../Backend/backend';
import React from 'react';
import { ICalendarScreenAction } from './CalendarReduce';

interface ICalendarsViewProps {
  calendars: ICalendar[];
  dispatch: React.Dispatch<ICalendarScreenAction>;
  calendarSelected: boolean[];
}
export const CalendarsView = React.memo(function (props: ICalendarsViewProps) {
  const { calendars, calendarSelected } = props;
  return (
    <Box marginTop="64px">
      {calendars.map((calendar, i) => {
        return (
          <div key={calendar.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={calendarSelected[i]}
                  onChange={() =>
                    props.dispatch({ type: 'toogleCalendar', payload: i })
                  }
                  style={{ color: calendar.color }}
                />
              }
              label={calendar.name}
            />
          </div>
        );
      })}
    </Box>
  );
});
