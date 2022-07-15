import { View, Text } from "react-native";
import React, { FC } from "react";
import { LessonCard, LessonCardI } from "../UI/LessonCard/LessonCard";
import { LessonT } from "../../state/schedule/types";

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
  lessons: LessonT[];
}
export const DayCard: FC<DayCardI> = ({ lessons }) => {
  return (
    <View>
      {lessons.map((lesson, i) => (
        <LessonCard
          count={lesson.count}
          time={lesson.time}
          data={lesson.data}
          roundingСorns={
            lessons.length === 1
              ? "all"
              : i === 0
              ? "top"
              : i === lessons.length - 1
              ? "bottom"
              : "none"
          }
          //  withSwitch={
          //  lesson.data.lowerWeek ? true
          // 	}
        />
      ))}
    </View>
  );
};

export default DayCard;
