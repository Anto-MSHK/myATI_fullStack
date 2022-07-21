import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";

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
  const lessons = useAppSelector((state) => state.schedule[0].days[0].lessons);
  return (
    <Layoult>
      <HeaderMain />
      <Calendar />
      <View style={styles.contentContainer}>
        <DayCard lessons={lessons} />
      </View>
    </Layoult>
  );
};
