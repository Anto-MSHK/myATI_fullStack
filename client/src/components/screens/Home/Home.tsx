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

// const lessons: lessonT[] = [
//   {
//     title: "SDS",
//     teacher: { name: "dsds", degree: "fdsfsdg" },
//     type: "dssd",
//     cabinet: "53",
//   },
//   {
//     title: "SDS",
//     teacher: { name: "dsds", degree: "fdsfsdg" },
//     type: "dssd",
//     cabinet: "53",
//   },
//   {
//     title: "SDS",
//     teacher: { name: "dsds", degree: "fdsfsdg" },
//     type: "dssd",
//     cabinet: "53",
//   },
//   {
//     title: "SDS",
//     teacher: { name: "dsds", degree: "fdsfsdg" },
//     type: "dssd",
//     cabinet: "53",
//   },
// ];
export const Home = () => {
  return (
    <Layoult>
      <View>
        <HeaderMain />
        <Calendar />
      </View>
      <View style={styles.contentContainer}>
        {/* <DayCard lessons={lessons} /> */}
        {/* <ScheduleContainer /> */}
        <TestScroll />
      </View>
    </Layoult>
  );
};
