import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import TelaPartidas from './pages/telaPartidas';
const anoIni = '2013';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/partidas/:ano">
          <TelaPartidas />
        </Route>
        <Redirect to={{ pathname: '/partidas/' + anoIni }} />
      </Switch>
    </HashRouter>
  );
}

export default App;
