import { View, ScrollView, FlatList } from "react-native";
import React, { FC, useEffect } from "react";
import { LessonCard, LessonCardI } from "../../UI/LessonCard/LessonCard";
import { c_style } from "./../../../stylesConst";
import { Text } from "@rneui/base";
import { UIstyles } from "./../UIstyles";
import { useStyles } from "../../../hooks/useStyles";
import { styles } from "./styles";
import { LessonT } from "../../../state/slices/schedule/types";
import { useAppSelector } from "../../../hooks/redux";
import { setCurStatus } from "../../../state/slices/settings/settingSlice";
import { useAppDispatch } from './../../../hooks/redux';

interface DayCardI {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5;
  lessons: LessonT[];
  dates: string;
}

const mounts = {
  1: "января",
  2: "февраля",
  3: "марта",
  4: "апреля",
  5: "мая",
  6: "июня",
  7: "июля",
  8: "августа",
  9: "сентября",
  10: "октября",
  11: "ноября",
  12: "декабря",
};

const days = {
  0: "понедельник",
  1: "вторник",
  2: "среда",
  3: "четверг",
  4: "пятница",
  5: "суббота",
};

export const DayCard: FC<DayCardI> = ({ lessons, dayOfWeek, dates }) => {
  //   const style = useStyles(styles);
  const dispatch = useAppDispatch();

  const styleUI = useStyles(UIstyles);
  const date = useAppSelector((state) => state.settings.curDate);

  const day = dates.split("/");
  const correctDay = day[1][0] !== "0" ? day[1] : day[1][1];
  const curD = day[1] === date.split("/")[1] ? "сегодня" : `${correctDay} `;
  const curM = curD === "сегодня" ? "" : mounts[+day[0] as any];

  const style = curD === "сегодня" ? { ...styleUI.h1_p } : { ...styleUI.h1 };

  const time = new Date();
  //   .toLocaleTimeString("en-US", {
  //     timeZone: "Europe/Moscow",
  //   });
  return (
    <View>
      <Text
        style={{
          bottom: -5,
          marginLeft: 10,
          marginTop: 10,
          ...style,
        }}
      >
        {`${curD}${curM},`}
        <Text style={styleUI.h1}> {days[`${dayOfWeek}`]}</Text>
      </Text>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: -5,
          borderColor: "black",
          ...UIstyles().shadow,
        }}
      >
        {lessons.map((lesson, i) => {
          let startHappyHourD = new Date();
          let endHappyHourD = new Date();
          let isTime = false;
          if (lesson.time.from && lesson.time.to) {
            startHappyHourD.setHours(
              +lesson.time.from.split(":")[0],
              +lesson.time.from.split(":")[1],
              0
            ); // 5.30 pm
            endHappyHourD.setHours(
              +lesson.time.to.split(":")[0],
              +lesson.time.to.split(":")[1],
              0
            );
            if (time >= startHappyHourD && time < endHappyHourD) {
              isTime = true;
              dispatch(
                setCurStatus(
                  `Сейчас идёт ${lesson.count} пара, с ${lesson.time.from} до ${lesson.time.to}.`
                )
              );
            }
            if (!isTime) dispatch(setCurStatus(`Сейчас пар нет.`));
          }
          return (
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
              isActive={isTime}
            />
          );
        })}
      </View>
    </View>
  );
};

export default DayCard;
