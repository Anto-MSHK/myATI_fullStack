import { View, ScrollView, FlatList } from "react-native";
import React, { FC, useEffect } from "react";
import { LessonCard, LessonCardI } from "../../UI/LessonCard/LessonCard";
import { LessonT } from "../../../state/schedule/types";
import { c_style } from "./../../../stylesConst";
import { Text } from "@rneui/base";
import { UIstyles } from "./../UIstyles";
import { useStyles } from "../../../hooks/useStyles";
import { styles } from "./styles";

interface DayCardI {
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6;
  lessons: LessonT[];
}

const days = {
  1: "понедельник",
  2: "вторник",
  3: "среда",
  4: "четверг",
  5: "пятница",
  6: "суббота",
};

export const DayCard: FC<DayCardI> = ({ lessons, dayOfWeek }) => {
  //   const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  return (
    <View>
      <Text
        style={{
          bottom: -5,
          marginLeft: 10,
          marginTop: 10,
          ...styleUI.h1_p,
        }}
      >
        Сегодня,
        <Text style={styleUI.h1}> {days[`${dayOfWeek}`]}</Text>
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
            key={i + "lesson"}
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
