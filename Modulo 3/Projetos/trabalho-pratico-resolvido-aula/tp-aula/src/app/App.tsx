import TelaDespesas from "./TelaDespesas";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const mesAtual = "2021-06";

  return (
    <HashRouter>
      <Switch>
        <Route path="/despesas/:mes">
          <TelaDespesas />
        </Route>
        <Redirect to={{ pathname: "/despesas/" + mesAtual}} />
      </Switch>
    </HashRouter>
  );
}

export default App;
