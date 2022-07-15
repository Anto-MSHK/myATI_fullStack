import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "./../../layoult/Layoult";
import React from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { LessonCard } from "./../../UI/LessonCard/LessonCard";
import { DayCard, lessonT } from "./../../DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";

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
      <DayCard lessons={lessons} />
    </Layoult>
  );
};
