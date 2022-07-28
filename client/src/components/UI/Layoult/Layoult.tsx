import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import React, { FC } from "react";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";

interface ILayoult {
  isScrollView?: boolean;
}

export const Layoult: FC<ILayoult> = ({ children, isScrollView = true }) => {
  const theme = useAppSelector((state) => state.appSettings.theme);

  const lightBG = require(`../../../../assets/lightBG.jpg`);
  const darkBG = require(`../../../../assets/darkBG.jpg`);

  return (
    <ImageBackground
      source={theme === "dark" ? lightBG : darkBG}
      style={{ flex: 1 }}
    >
      <View>
        {isScrollView ? <ScrollView>{children}</ScrollView> : children}
      </View>
    </ImageBackground>
  );
};

export default Layoult;
