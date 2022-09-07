export enum APP {
  SET_CUR_DAY = "APP/SET_CUR_DAY",
  SET_CUR_WEEK = "APP/SET_CUR_WEEK",
}

export type setCurDayAT = {
  type: string;
  count: number;
};

export const setCurDayA = (count: number): setCurDayAT => ({
  type: APP.SET_CUR_DAY,
  count: count,
});

export type AppAction = setCurDayAT;
