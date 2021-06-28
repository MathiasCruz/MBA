import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { getSessionLogin } from './Backend/ChamadasAPI';
import { IUser } from './Interfaces/IUser';
import Login from './login';
import DespesasPage from './Pages/DespesasPage';

function App() {
  const mesAtual = '2021-06';
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    getSessionLogin().then(setUser, OnSignOut);
  }, []);

  function OnSignOut() {
    setUser(null);
  }
  if (user) {
    return (
      <HashRouter>
        <Switch>
          <Route path="/despesas/:mes">
            <DespesasPage />
          </Route>
          <Redirect to={{ pathname: '/despesas/' + mesAtual }} />
        </Switch>
      </HashRouter>
    );
  } else {
    return (
      <div>
        <Login onSignin={setUser}></Login>
      </div>
    );
  }
}

export default App;
