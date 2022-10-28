export type GroupMinT = {
  name: string;
  faculty: "ФВО" | "СПО";
  elder?: string;
};

export type GroupsStateT = { groups: GroupMinT[]; isLoading: boolean };
