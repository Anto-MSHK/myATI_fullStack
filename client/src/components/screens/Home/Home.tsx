import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { ScheduleContainer } from "./../../UI/ScheduleContainer/ScheduleContainer";
import { TestScroll } from "./../../UI/ScheduleContainer/TestScroll";
import { LessonT } from "../../../state/schedule/types";
import { LessonCard } from "../../UI/LessonCard/LessonCard";

const lessons: LessonT[] = [
  {
    count: 1,
    time: { from: "10", to: "11" },
    data: {
      topWeek: {
        subject: { title: "SDS", type: "dssd" },
        teacher: { name: "dsds", degree: "fdsfsdg" },
        cabinet: "53",
      },
      lowerWeek: {
        subject: { title: "SsdadasdDS", type: "dssd" },
        teacher: { name: "dsds", degree: "fdsfsdg" },
        cabinet: "53",
      },
    },
  },
];
export const Home = () => {
  return (
    <Layoult>
      <View>
        <HeaderMain />
        <Calendar />
      </View>
      <View style={styles.contentContainer}>
        {/* <ScheduleContainer /> */}
        <TestScroll />
      </View>
    </Layoult>
  );
};
