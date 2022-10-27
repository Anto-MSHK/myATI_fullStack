export enum APP_SETTINGS {
  SET = "APP/SET",
  SET_CUR_DAY = "APP/SET_CUR_DAY",
  SET_CUR_WEEK = "APP/SET_CUR_WEEK",
}

export type getAppSettingsAT = {
  type: string;
  theme: "light" | "dark";
};

export const setAppSettingsA = (theme: "light" | "dark"): getAppSettingsAT => ({
  type: APP_SETTINGS.SET,
  theme,
});

export type AppSettingsAction = getAppSettingsAT;
