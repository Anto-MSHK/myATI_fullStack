import { AppSettingsAction, APP_SETTINGS } from "./actions";
import { AppSettingsStateT } from "./types";
import { useThemeMode } from "@rneui/themed";

export const initialState: AppSettingsStateT = {
  theme: "dark",
  curDay: 0,
  curWeek: "topWeek",
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
      var curDay = action.count;
      // console.log("111");
      return { ...state, curDay };
    default:
      return state;
  }
};
