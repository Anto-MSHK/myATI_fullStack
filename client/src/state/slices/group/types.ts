type subjectT = {
  title: string;
  type: string;
};

type teacherT = {
  name: string;
  degree: string;
};

export type dataLessonT = {
  subject: subjectT;
  teacher: teacherT;
  cabinet: string;
};

export type dataT = {
  topWeek: dataLessonT;
  lowerWeek?: dataLessonT;
  [key: string | "topWeek" | "lowerWeek"]:
    | dataLessonT
    | (dataLessonT | undefined);
};
export type LessonT = {
  count: 1 | 2 | 3 | 4 | 5;
  time: { from: string; to: string };
  data: dataT;
  special?: string;
};

export type DayT = {
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6;
  isWeekend: boolean;
  lessons: LessonT[];
};

export interface ScheduleGroupsStateT {
  group: string;
  days: DayT[];
}

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
  timeReload: string;
}

export interface GroupsStateI {
  groups: GroupMinT[];
}
