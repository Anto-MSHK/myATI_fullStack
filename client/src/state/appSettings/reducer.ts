import { AppSettingsAction, APP_SETTINGS } from "./actions";
import { AppSettingsStateT } from "./types";
import { useThemeMode } from "@rneui/themed";

export const initialState: AppSettingsStateT = {
  theme: "dark",
};

export const appSettingsReducer = (
  state: AppSettingsStateT = initialState,
  action: AppSettingsAction
) => {
  switch (action.type) {
    case APP_SETTINGS.SET:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
