export enum APP_SETTINGS {
  SET = "APP/SET",
}

export type getAppSettingsAT = {
  type: string;
};

export const setAppSettingsA = (): getAppSettingsAT => ({
  type: APP_SETTINGS.SET,
});

export type AppSettingsAction = getAppSettingsAT;
