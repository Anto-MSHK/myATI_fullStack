import { View } from "react-native";
import React, { FC } from "react";
import { LessonCard, LessonCardI } from "../../UI/LessonCard/LessonCard";
import { LessonT } from "../../../state/schedule/types";
import { c_style } from "./../../../stylesConst";
import { Text } from "@rneui/base";
import { UIstyles } from "./../UIstyles";

interface DayCardI {
  lessons: LessonT[];
}

export const DayCard: FC<DayCardI> = ({ lessons }) => {
  return (
    <View>
      <Text
        style={{
          bottom: -5,
          marginLeft: 10,
          marginTop: 10,
          ...UIstyles().h1_p,
        }}
      >
        Сегодня,<Text style={UIstyles().h1}> понедельник</Text>
      </Text>
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
