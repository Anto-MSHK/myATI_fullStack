export type GroupMinT = {
  name: string;
  faculty: "ФВО" | "СПО";
  elder?: string;
};

export interface GroupsStateI {
  groups: GroupMinT[];
}
