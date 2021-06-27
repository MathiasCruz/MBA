import { Action, configureStore, PayloadAction } from "@reduxjs/toolkit";

type CellValue = "X" | "O" | "";

interface TicTacToeState {
  nextPLayer: "X" | "O";
  board: CellValue[][];
}
const initialState: TicTacToeState = {
  nextPLayer: "X",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

type ActionPLay = PayloadAction<{ i: number; j: number }, "play">;
type ActionReset = Action<"reset">;
function TicTacToeReducer(state = initialState, action: ActionPLay | ActionReset): TicTacToeState {
  switch (action.type) {
    case "play":
      const board = state.board.map((row) => row.map((cell) => cell));
      return { nextPLayer: state.nextPLayer === "X" ? "O" : "X", board };
    case "reset":
  }
  return state;
}
configureStore({
  reducer: {
    ticTacToe: TicTacToeReducer,
  },
});
export function TicTacToe() {
  const state: TicTacToeState = {
    nextPLayer: "X",
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
  return (
    <div className="ticTacToe">
      <table>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button>Reiniciar partida</button>
    </div>
  );
}
