import { GroupMinT } from "./types";

export enum GROUP {
  GET = "GROUP/GET",
}

export type getGroupsAT = {
  type: string;
  groups: GroupMinT[];
};

export const getGroupsA = (groups: GroupMinT[]): getGroupsAT => ({
  type: GROUP.GET,
  groups,
});

export type GroupAction = getGroupsAT;
