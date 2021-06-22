import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { GetActualYearMonth } from './Helpers/dateHelpers';
import DespesasPages from './Pages/DespesasPages';

function App() {
  const date = GetActualYearMonth();
  console.log(date);
  return (
    <Router>
      <Switch>
        <Route path="/despesas/:date">
          <DespesasPages />
        </Route>
        <Redirect to={{ pathname: '/despesas/' + date }}></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
