import { View, Text } from "react-native";
import React, { FC } from "react";
import DayCard from "../DayCard/DayCard";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useStyles } from "./../../../hooks/useStyles";
import { UIstyles } from "../UIstyles";

interface DayPage {
  children: any;
  index: number;
  translateY: Animated.SharedValue<number>;
  movementY: Animated.SharedValue<number>;
  onChange: (event: any, dayOfWeek: number) => void;
}
export const SwipePage: FC<DayPage> = ({
  translateY,
  onChange,
  index,
  children,
  movementY,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const nextTextStyle = useAnimatedStyle(() => {
    const op = interpolate(movementY.value, [0, -100], [0, 1]);
    return {
      opacity: op,
    };
  });
  const prevTextStyle = useAnimatedStyle(() => {
    const op = interpolate(movementY.value, [0, 100], [0, 1]);
    return {
      opacity: op,
    };
  });
  const { theme } = useTheme();
  const styleUI = useStyles(UIstyles);
  return (
    <Animated.View
      style={[animatedStyle]}
      onLayout={(event) => {
        onChange(event, index);
      }}
    >
      {index !== 0 && (
        <Animated.View
          style={[
            { position: "absolute", top: -40, right: 0, left: 0 },
            prevTextStyle,
          ]}
        >
          <Icon
            name={"arrowdown"}
            type={"antdesign"}
            color={theme.colors.grey2}
          />
          <Text
            style={{
              ...styleUI.h3_p,
              color: theme.colors.grey2,
              textAlign: "center",
            }}
          >
            предыдущий день
          </Text>
        </Animated.View>
      )}
      {children}
      {index !== 5 && (
        <Animated.View
          style={[
            { position: "absolute", bottom: -50, right: 0, left: 0 },
            nextTextStyle,
          ]}
        >
          <Icon
            name={"arrowup"}
            type={"antdesign"}
            color={theme.colors.grey2}
          />
          <Text
            style={{
              ...styleUI.h3_p,
              color: theme.colors.grey2,
              textAlign: "center",
            }}
          >
            следующий день
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default DayPage;
