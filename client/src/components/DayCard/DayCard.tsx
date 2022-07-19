import { View, Text } from "react-native";
import React, { FC } from "react";
import { LessonCard, LessonCardI } from "../UI/LessonCard/LessonCard";
import { LessonT } from "../../state/schedule/types";
import { c_style } from "./../../stylesConst";

interface DayCardI {
  lessons: LessonT[];
}

export const DayCard: FC<DayCardI> = ({ lessons }) => {
  return (
    <View>
      <View style={{ marginTop: 10, marginHorizontal: -5 }}>
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
    </View>
  );
};

export default DayCard;
