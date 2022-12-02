export interface AppSettingsStateI {
  theme: "light" | "dark";
  curDay: 0 | 1 | 2 | 3 | 4 | 5;
  curWeek: "topWeek" | "lowerWeek";
  curDate: string;
  weekDates: string[];
  curStatus: string;
}
