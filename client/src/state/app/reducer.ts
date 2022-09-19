import { AppAction, APP } from "./actions";
import { AppStateT } from "./types";

export const initialState: AppStateT = {
  curDay: 2,
  curWeek: "topWeek",
};

export const appReducer = (
  state: AppStateT = initialState,
  action: AppAction
) => {
  switch (action.type) {
    case APP.SET_CUR_DAY:
      return { ...state, curDay: action.count };
    default:
      return state;
  }
};
