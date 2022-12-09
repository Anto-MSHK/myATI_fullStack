import { DayT } from "../schedule/types";

export type GroupMinT = {
  name: string;
  faculty: "FVO" | "SPO";
  elder?: string;
};

export type GroupListT = {
  name: string;
  isMain?: boolean;
};

export interface GroupListStateI {
  groups: GroupListT[];
  scheduleMainGroup: DayT[];
}

export interface GroupsStateI {
  groups: GroupMinT[];
}
