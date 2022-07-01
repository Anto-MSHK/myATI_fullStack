import { View, Text, ScrollView } from "react-native";
import React, { FC } from "react";

interface ILayoult {
  isScrollView?: boolean;
}

export const Layoult: FC<ILayoult> = ({ children, isScrollView = true }) => {
  return (
    <View>{isScrollView ? <ScrollView>{children}</ScrollView> : children}</View>
  );
};

export default Layoult;
