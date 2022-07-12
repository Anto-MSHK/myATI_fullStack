import { View, Text } from "react-native";
import React, { FC } from "react";
import { LessonCard, LessonCardI } from "../UI/LessonCard/LessonCard";

export type lessonT = {
  title: string;
  type: string;
  teacher: {
    name: string;
    degree?: string;
  };
  cabinet?: string;
};

interface DayCardI {
  lessons: lessonT[];
}
export const DayCard: FC<DayCardI> = ({ lessons }) => {
  return (
    <View>
      {lessons.map((lesson, i) => (
        <LessonCard
          title={lesson.title}
          type={lesson.type}
          teacher={{ name: lesson.teacher.name, degree: lesson.teacher.degree }}
          cabinet={lesson.cabinet}
          roundingСorns={
            lessons.length === 1
              ? "all"
              : i === 0
              ? "top"
              : i === lessons.length - 1
              ? "bottom"
              : "none"
          }
          //  withSwitch
        />
      ))}
    </View>
  );
};

export default DayCard;
