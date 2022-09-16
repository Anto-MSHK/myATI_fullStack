import { AppSettingsAction, APP_SETTINGS } from "./actions";
import { AppSettingsStateT } from "./types";
import { useThemeMode } from "@rneui/themed";

export const initialState: AppSettingsStateT = {
  theme: "dark",
  curDay: 2,
};

export const appSettingsReducer = (
  state: AppSettingsStateT = initialState,
  action: AppSettingsAction
) => {
  switch (action.type) {
    case APP_SETTINGS.SET:
      var theme: "light" | "dark";
      state.theme === "light" ? (theme = "dark") : (theme = "light");
      return { ...state, theme };
    case APP_SETTINGS.SET_CUR_DAY:
      // var curDay: 0 | 1 | 2 | 3 | 4 | 5 = action.count as 0 | 1 | 2 | 3 | 4 | 5;
      return { ...state, curDay: action.count };
    default:
      return state;
  }
};
