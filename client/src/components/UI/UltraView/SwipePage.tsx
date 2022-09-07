import { View, Text } from "react-native";
import React, { FC } from "react";
import DayCard from "../DayCard/DayCard";
import { DayT } from "../../../state/schedule/types";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface DayPage {
  children: any;
  index: number;
  translateY: Animated.SharedValue<number>;
  onChange: (event: any, dayOfWeek: number) => void;
}
export const SwipePage: FC<DayPage> = ({
  translateY,
  onChange,
  index,
  children,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Animated.View
      style={[animatedStyle]}
      onLayout={(event) => {
        onChange(event, index);
      }}
    >
      {children}
    </Animated.View>
  );
};

export default DayPage;
