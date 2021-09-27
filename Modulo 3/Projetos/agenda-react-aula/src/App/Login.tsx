import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { ILoginScreenProps, SignIn } from '../Backend/backend';

const useStyles = makeStyles({
  error: {
    backgroundColor: 'rgb(253,236,234)',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
  },
});
export default function Login(props: ILoginScreenProps) {
  const classes = useStyles();
  const [email, setEmail] = useState('danilo@email.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  function SignInEvent(evt: React.FormEvent) {
    evt.preventDefault();
    SignIn(email, password).then(props.onSignin, err => {
      setError('Email não encontrado ou Senha incorreta');
      console.error(err);
    });
  }
  return (
    <Container maxWidth="sm">
      <h1>Login Agenda</h1>
      <form onSubmit={SignInEvent}>
        <TextField
          autoFocus
          id="email"
          type="E-mail"
          label="Email"
          value={email}
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={evt => {
            setEmail(evt.target.value);
          }}
        />
        <TextField
          autoFocus
          id="password"
          type="password"
          label="Senha"
          fullWidth
          value={password}
          variant="outlined"
          margin="normal"
          onChange={evt => {
            setPassword(evt.target.value);
          }}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
