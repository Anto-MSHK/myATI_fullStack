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
}

export interface GroupsStateI {
  groups: GroupMinT[];
}
