import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import React, { FC, ReactElement, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import DayCard from "../DayCard/DayCard";
import { DayPage } from "./DayPage";
// import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Logs } from "expo";
import { DayT } from "../../../state/schedule/types";

type day = DayT & { height: number };

export const TestScroll = () => {
  Logs.enableExpoCliLogging();
  console.log(" ~~ EXPO CONSOLE LOGGING ENABLED ~~");

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const [count, setCount] = useState(0);

  const days = useAppSelector((state) => state.schedule[0].days);

  var actualDays: day[] = [
    { ...days[count], height: 1 },
    { ...days[count + 1], height: 1 },
  ];

  const [heg, setHeight] = useState(0);
  const measureView = (event: LayoutChangeEvent, dayOfWeek: number) => {
    const index = actualDays.find(
      (day) => day.dayOfWeek === dayOfWeek
    )?.dayOfWeek;
    index && (actualDays[count].height = heg);
    setHeight(event.nativeEvent.layout.height);
    console.log(actualDays);
  };
  const panGesture = Gesture.Pan()
    .onStart((e) => {
      actualDays.push({ ...days[count], height: 1 });
    })
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationY;
      } else {
        position.value = END_POSITION + e.translationY;
        console.log("start");
      }
    });
  //  .onEnd((e) => {
  //    if (position.value > END_POSITION / 2) {
  //      position.value = withTiming(END_POSITION, { duration: 100 });
  //      onLeft.value = false;
  //    } else {
  //      position.value = withTiming(0, { duration: 100 });
  //      onLeft.value = true;
  //    }
  //  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <Animated.View>
          {actualDays.map((day, index) => {
            return (
              <View onLayout={(event) => measureView(event, day.dayOfWeek)}>
                <DayPage day={day} index={index} translateY={position} />
                <Text style={[animatedStyle]}>{day.height}</Text>
              </View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: "center",
  },
});
