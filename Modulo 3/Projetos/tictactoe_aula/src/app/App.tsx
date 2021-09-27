import { Provider } from "react-redux";
import { store } from "./Store";
import { TicTacToe } from "./TicTacToe";

function App() {
  return (
    <Provider store={store}>
      {" "}
      <TicTacToe />
    </Provider>
  );
}

export default App;
