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

function App() {
  const date = GetToday().substr(0, 7);
  const [UserSession, setUserSession] = useState<IUser | null>(null);
  useEffect(() => {
    getSessionLogin().then(setUserSession, SignOut);
  }, []);

  function SignOut() {
    setUserSession(null);
  }
  if (UserSession) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/calendar/:date">
              <DenseTable user={UserSession} OnSignOut={SignOut} />
            </Route>
            <Redirect to={{ pathname: '/calendar/' + date }}></Redirect>
          </Switch>
        </Router>
      </>
    );
  } else {
    return <Login onSignin={setUserSession} />;
  }
}

export default App;
