import { GroupMinT } from "./types";

export enum GROUP {
  GET = "GROUP/GET",
  LOADING = "GROUP/LOADING",
}

export type getGroupsAT = {
  type: string;
  groups: GroupMinT[];
};

export const getGroupsA = (groups: GroupMinT[]): getGroupsAT => ({
  type: GROUP.GET,
  groups,
});

export type isLoadingAT = {
  type: string;
  isLoading: boolean;
};

export const isLoadingGroupA = (isLoading: boolean): isLoadingAT => ({
  type: GROUP.LOADING,
  isLoading,
});

export type GroupAction = getGroupsAT & isLoadingAT;
