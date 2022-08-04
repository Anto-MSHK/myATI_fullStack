import { View, Text } from "react-native";
import React, { FC } from "react";
import DayCard from "../DayCard/DayCard";
import { DayT } from "../../../state/schedule/types";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface DayPage {
  day: DayT;
  index: number;
  translateY: Animated.SharedValue<number>;
}
export const DayPage: FC<DayPage> = ({ day, index, translateY }) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <Animated.View style={[rStyle]}>
      <DayCard dayOfWeek={day.dayOfWeek} lessons={day.lessons} />
    </Animated.View>
  );
};

export default DayPage;
