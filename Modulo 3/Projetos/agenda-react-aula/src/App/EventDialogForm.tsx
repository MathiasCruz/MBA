import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CreateEvents, IDialogFormProps } from '../Backend/backend';

export default function EventDialogForm(props: IDialogFormProps) {
  const { openDialog, calendar } = props;
  const [event, setEvent] = useState(openDialog);

  useEffect(() => {
    setEvent(openDialog);
    console.log(openDialog?.calendarId);
  }, [openDialog]);

  function saveEvent(evt: React.FormEvent) {
    evt.preventDefault();
    if (event) {
      CreateEvents(event).then(props.OnClose);
      props.OnSave();
    }
  }
  return (
    <div>
      <Dialog
        open={!!openDialog}
        onClose={props.OnClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={saveEvent}>
          <DialogTitle id="form-dialog-title">Novo Evento</DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="date"
                  type="date"
                  label="Data"
                  value={event.date}
                  onChange={evt =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Descrição"
                  fullWidth
                  value={event.desc}
                  onChange={evt =>
                    setEvent({ ...event, desc: evt.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="time"
                  type="time"
                  value={event?.time}
                  label="Horário"
                  onChange={evt =>
                    setEvent({ ...event, time: evt.target.value })
                  }
                  fullWidth
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="select">Agenda</InputLabel>
                  <Select
                    labelId="select"
                    value={event.calendarId}
                    onChange={evt =>
                      setEvent({
                        ...event,
                        calendarId: evt.target.value as number,
                      })
                    }
                  >
                    {props.calendar.map(cal => {
                      return (
                        <MenuItem key={cal.id} value={cal.id}>
                          {cal.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={props.OnClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
