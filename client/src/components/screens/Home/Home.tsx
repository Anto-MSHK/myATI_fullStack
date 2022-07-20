import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "../../Layoult/Layoult";
import React from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { LessonCard } from "./../../UI/LessonCard/LessonCard";
import { DayCard } from "./../../DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../Calendar/Calendar";

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
      <DayCard lessons={lessons} />
    </Layoult>
  );
};
