import { AppAction, APP } from "./actions";
import { AppStateT } from "./types";

export const initialState: AppStateT = {
  curDay: 0,
  curWeek: "topWeek",
};

export const appReducer = (
  state: AppStateT = initialState,
  action: AppAction
) => {
  switch (action.type) {
    case APP.SET_CUR_DAY:
      var curDay: 0 | 1 | 2 | 3 | 4 | 5 = action.count as 0 | 1 | 2 | 3 | 4 | 5;
      return { ...state, curDay };
    default:
      return state;
  }
};
