import { Action, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type CellValue = "X" | "O" | "";
export type Winner = "X" | "O" | "?" | "=";
export interface TicTacToeState {
  nextPLayer: "X" | "O";
  winner: Winner;
  board: CellValue[][];
}
type ActionPLay = PayloadAction<{ i: number; j: number }>;
type ActionReset = Action<"reset">;
export const initialState: TicTacToeState = {
  nextPLayer: "X",
  winner: "?",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};
const slice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    play: (state, action: ActionPLay) => {
      const { i, j } = action.payload;
      if (state.board[i][j] === "" && state.winner === "?") {
        state.board[i][j] = state.nextPLayer;
        state.winner = getWinner(state.board);
        state.nextPLayer = state.nextPLayer === "X" ? "O" : "X";
      } else {
        return state;
      }
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const store = configureStore({
  reducer: {
    ticTacToe: slice.reducer,
  },
});
function getWinner(board: CellValue[][]): Winner {
  const players: ("X" | "O")[] = ["X", "O"];
  for (const actualPlayer of players) {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === actualPlayer &&
        board[i][1] === actualPlayer &&
        board[i][2] === actualPlayer
      ) {
        return actualPlayer;
      }
      if (
        board[0][i] === actualPlayer &&
        board[1][i] === actualPlayer &&
        board[2][i] === actualPlayer
      ) {
        return actualPlayer;
      }
      if (
        board[0][0] === actualPlayer &&
        board[1][1] === actualPlayer &&
        board[2][2] === actualPlayer
      ) {
        return actualPlayer;
      }
      if (
        board[0][2] === actualPlayer &&
        board[1][1] === actualPlayer &&
        board[2][0] === actualPlayer
      ) {
        return actualPlayer;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return "?";
      }
    }
  }
  return "=";
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { play, reset } = slice.actions;
