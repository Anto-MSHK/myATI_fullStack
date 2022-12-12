import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@rneui/themed";
import { useAppSelector } from "../../../hooks/redux";

export const StatusLine = () => {
  const { theme } = useTheme();
  let curStatus = useAppSelector((state) => state.settings.curStatus);
  const [count, setCount] = useState(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const tick = () => {
      opacity.value = withSpring(0);
      setTimeout(() => {
        setCount((prev) => {
          if (prev < curStatus.length - 1) return prev + 1;
          else return 0;
        });
        opacity.value = withSpring(1);
      }, 200);
    };

    const timerId = setInterval(tick, 3500);

    return () => clearInterval(timerId);
  }, [curStatus]);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.grey5,
        zIndex: 2,
        elevation: 2,
      }}
    >
      <Animated.View style={[opacityStyle]}>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.black,
            paddingVertical: 2,
            fontSize: 13,
          }}
        >
          {curStatus.length !== 0 ? curStatus[count] : "Сегодня пар уже нет"}
        </Text>
      </Animated.View>
    </View>
  );
};
