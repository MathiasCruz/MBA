import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ICalendar } from '../Backend/backend';

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toogleCalendar: (i: number) => void;
  calendarSelected: boolean[];
}

export default function CalendarsView(props: ICalendarsViewProps) {
  const { calendars, toogleCalendar, calendarSelected } = props;
  return (
    <Box marginTop="64px">
      {calendars.map((calendar, i) => {
        return (
          <div key={calendar.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={calendarSelected[i]}
                  onChange={() => toogleCalendar(i)}
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
}
