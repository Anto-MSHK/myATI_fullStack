import { View, ScrollView, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { LessonCard, LessonCardI } from "../../UI/LessonCard/LessonCard";
import { c_style } from "./../../../stylesConst";
import { Text } from "@rneui/base";
import { UIstyles } from "./../UIstyles";
import { useStyles } from "../../../hooks/useStyles";
import { styles } from "./styles";
import { LessonT } from "../../../state/slices/schedule/types";
import { useAppSelector } from "../../../hooks/redux";
import { setCurStatus } from "../../../state/slices/settings/settingSlice";
import { useAppDispatch } from "./../../../hooks/redux";

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

  let [timeTo, setTimeTo] = useState<
    { from: string; to: string; count: number; day: string } | undefined
  >(undefined);

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
        style={[{
          marginTop: 10,
          marginHorizontal: -5,
          borderColor: "black",
        }]}
      >
        {lessons.map((lesson, i) => {
          let startTime = new Date();
          let endTime = new Date();
          if (lesson.time.from && lesson.time.to && curD === "сегодня") {
            startTime.setHours(
              +lesson.time.from.split(":")[0],
              +lesson.time.from.split(":")[1],
              0
            ); // 5.30 pm
            endTime.setHours(
              +lesson.time.to.split(":")[0],
              +lesson.time.to.split(":")[1],
              0
            );
            if (time >= startTime && time < endTime) {
              if (timeTo === undefined) {
                setTimeTo({
                  from: lesson.time.from,
                  to: lesson.time.to,
                  count: +lesson.count,
                  day: curD,
                });
              } else
                dispatch(
                  setCurStatus(
                    `Сейчас идёт ${timeTo.count} пара, с ${timeTo.from} до ${timeTo.to}.`
                  )
                );
            }
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
              isActive={
                curD === "сегодня" && +lesson.count === +timeTo?.count
                  ? true
                  : false
              }
            />
          );
        })}
      </View>
    </View>
  );
};

export default DayCard;
