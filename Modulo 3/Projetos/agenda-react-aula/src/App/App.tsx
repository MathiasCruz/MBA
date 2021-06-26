import DenseTable from './CalendarScreen';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { GetToday } from './dateFunctions';
import { getSessionLogin, IUser } from '../Backend/backend';
import { useEffect, useState } from 'react';
import Login from './Login';
import { authContext } from './AuthContext';

function App() {
  const date = GetToday().substr(0, 7);
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    getSessionLogin().then(setUser, OnSignOut);
  }, []);

  function OnSignOut() {
    setUser(null);
  }
  if (user) {
    return (
      <>
        <authContext.Provider value={{ user, OnSignOut }}>
          <Router>
            <Switch>
              <Route path="/calendar/:date">
                <DenseTable />
              </Route>
              <Redirect to={{ pathname: '/calendar/' + date }}></Redirect>
            </Switch>
          </Router>
        </authContext.Provider>
      </>
    );
  } else {
    return <Login onSignin={setUser} />;
  }
}

export default App;
