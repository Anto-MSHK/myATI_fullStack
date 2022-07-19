import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import React, { FC } from "react";

interface ILayoult {
  isScrollView?: boolean;
}

export const Layoult: FC<ILayoult> = ({ children, isScrollView = true }) => {
  return (
    <ImageBackground
      source={require("../../../assets/back_dark.jpg")}
      style={{ flex: 1 }}
    >
      {isScrollView ? <ScrollView>{children}</ScrollView> : children}
    </ImageBackground>
  );
};

export default Layoult;
