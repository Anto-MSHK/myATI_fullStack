import { DayT } from "./types";

export enum SCHEDULE {
  GET = "SCHEDULE/GET",
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

export type ScheduleAction = getScheduleAT;
