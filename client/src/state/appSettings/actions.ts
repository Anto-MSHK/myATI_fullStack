export enum APP_SETTINGS {
  SET = "APP/SET",
  SET_CUR_DAY = "APP/SET_CUR_DAY",
  SET_CUR_WEEK = "APP/SET_CUR_WEEK",
}

export type getAppSettingsAT = {
  type: string;
};

export type setCurDayAT = {
  type: string;
  count: number;
};

export const setAppSettingsA = (): getAppSettingsAT => ({
  type: APP_SETTINGS.SET,
});

export const setCurDayA = (count: number): setCurDayAT => ({
  type: APP_SETTINGS.SET_CUR_DAY,
  count: count,
});

export type AppSettingsAction = getAppSettingsAT & setCurDayAT;
