import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import DayCard from "../DayCard/DayCard";
import { DayPage } from "./DayPage";
// import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Logs } from "expo";

export const TestScroll = () => {
  const days = useAppSelector((state) => state.schedule[0].days);

  Logs.enableExpoCliLogging();
  console.log(" ~~ EXPO CONSOLE LOGGING ENABLED ~~");

  const translateY = useSharedValue(0);
  const panGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event) => {
        console.log(event.translationX);
      },
      onActive: (event) => {
        console.log(event.translationX);
        translateY.value = event.translationY;
      },
      onEnd: (event) => {
        console.log(event.translationX);
      },
    });
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View>
        {days.map((day, index) => {
          return <DayPage day={day} index={index} translateY={translateY} />;
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: "center",
  },
});
