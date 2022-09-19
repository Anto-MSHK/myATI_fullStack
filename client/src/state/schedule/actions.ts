import { DayT } from "./types";

export enum SCHEDULE {
  GET = "SCHEDULE/GET",
}

export type getScheduleAT = {
  type: string;
  schedule: DayT[];
};

export const getScheduleA = (schedule: DayT[]): getScheduleAT => ({
  type: SCHEDULE.GET,
  schedule,
});

export type ScheduleAction = getScheduleAT;
