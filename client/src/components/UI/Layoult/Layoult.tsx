import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import React, { FC } from "react";
import { useTheme, useThemeMode } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";

interface ILayoult {
  isScrollView?: boolean;
}

export const Layoult: FC<ILayoult> = ({ children, isScrollView = false }) => {
  const { mode, setMode } = useThemeMode();
  const lightBG = require(`../../../../assets/lightBG.jpg`);
  const darkBG = require(`../../../../assets/darkBG.jpg`);

  return (
    <ImageBackground
      source={mode === "dark" ? darkBG : lightBG}
      style={{ flex: 1, zIndex: -2, elevation: -2, bottom: -2 }}
    >
      {isScrollView ? <ScrollView>{children}</ScrollView> : children}
    </ImageBackground>
  );
};

export default Layoult;
