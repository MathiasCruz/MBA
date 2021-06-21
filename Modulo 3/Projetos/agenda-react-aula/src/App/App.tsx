import DenseTable from './CalendarScreen';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { GetToday } from './dateFunctions';
function App() {
  const date = GetToday().substr(0, 7);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/calendar/:date">
            <DenseTable />
          </Route>
          <Redirect to={{ pathname: '/calendar/' + date }}></Redirect>
        </Switch>
      </Router>
    </>
  );
}

export default App;
