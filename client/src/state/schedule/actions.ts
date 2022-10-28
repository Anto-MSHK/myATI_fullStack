import { DayT } from "./types";

export enum SCHEDULE {
  GET = "SCHEDULE/GET",
  LOADING = "SCHEDULE/LOADING",
}

export type getScheduleAT = {
  type: string;
  group: string;
  schedule: DayT[];
};

export const getScheduleA = (
  group: string,
  schedule: DayT[]
): getScheduleAT => ({
  type: SCHEDULE.GET,
  group,
  schedule,
});

export type isLoadingAT = {
  type: string;
  isLoading: boolean;
};

export const isLoadingA = (isLoading: boolean): isLoadingAT => ({
  type: SCHEDULE.LOADING,
  isLoading,
});
export type ScheduleAction = getScheduleAT & isLoadingAT;
