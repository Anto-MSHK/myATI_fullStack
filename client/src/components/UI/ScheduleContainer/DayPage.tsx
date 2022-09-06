import { View, Text } from "react-native";
import React, { FC } from "react";
import DayCard from "../DayCard/DayCard";
import { DayT } from "../../../state/schedule/types";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface DayPage {
  day: DayT;
  index?: number;
  translateY: Animated.SharedValue<number>;
  size: number;
  onChange: (event: any, dayOfWeek: number) => void;
}
export const DayPage: FC<DayPage> = ({
  day,
  index,
  translateY,
  size,
  onChange,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  var count = 0;
  return (
    <Animated.View
      style={[animatedStyle]}
      onLayout={(event) => {
        onChange(event, day.dayOfWeek);
      }}
    >
      <DayCard dayOfWeek={day.dayOfWeek} lessons={day.lessons} />
    </Animated.View>
  );
};

export default DayPage;
