import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "./../../layoult/Layoult";
import React from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { LessonCard } from "./../../UI/LessonCard/LessonCard";
export const Home = () => {
  return (
    <Layoult>
      <HeaderMain />
      <LessonCard
        title="Разработка професиональных приложений"
        teacher={{ name: "Чумак И.В.", degree: "к.м.н." }}
        cabinet="324"
      />
    </Layoult>
  );
};
