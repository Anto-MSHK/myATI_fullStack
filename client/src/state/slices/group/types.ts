export type GroupMinT = {
  name: string;
  faculty: "FVO" | "SPO";
  elder?: string;
};

export interface GroupsStateI {
  groups: GroupMinT[];
}
