import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import React, { FC, ReactElement, useEffect, useState } from "react";
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
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import { Logs } from "expo";
import { DayT } from "../../../state/schedule/types";

type day = DayT & { height: number };

const { height } = Dimensions.get("screen");

const HEIGHT_CONTENT = height - 200;
export const TestScroll = () => {
  Logs.enableExpoCliLogging();

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const test = useSharedValue(0);
  const contextY = useSharedValue(0);

  const count = useSharedValue(1);

  const days = useAppSelector((state) => state.schedule[0].days);
  const [sizeHeight, setSizeHeight] = useState<{ size: number; day: number }[]>(
    []
  );
  const [posDays, setPosDays] = useState<number[]>([]);
  const [marginDays, setMarginDays] = useState<number[]>([]);
  const [heg, setHeight] = useState(0);
  var [done, setDone] = useState(false);
  const measureView = (event: LayoutChangeEvent, dayOfWeek: number) => {
    if (!done) {
      console.log("bruh");

      setSizeHeight((prev) => {
        var isExist = prev.find((el) => {
          if (el) return dayOfWeek === el.day;
          else return undefined;
        });
        if (event.nativeEvent && dayOfWeek && !isExist) {
          prev.push({ size: event.nativeEvent.layout.height, day: dayOfWeek });
          prev.sort(function (a, b) {
            return a.day - b.day;
          });
          addMargin(prev);
        }
        return prev;
      });

      if (marginDays.length === 6) {
        setDone(true);
        posCard(sizeHeight, marginDays);
        console.log(sizeHeight);
        console.log(marginDays);
      }
    }
  };

  const posCard = (size: { size: number; day: number }[], margin: number[]) => {
    setPosDays((prev) => {
      for (var i = 0; i < size.length; i++) {
        var dayPos = 0;
        for (var j = 0; j <= i; j++) {
          dayPos += margin[j] + size[j].size;
        }
        prev.push(dayPos);
      }
      for (i = 0; i < 1; i++) prev.unshift(prev.pop() as number);
      prev[0] = 0;
      console.log(prev);
      return [...prev];
    });

    //  dayPos +=
    //    HEIGHT_CONTENT - (!el ? 0 : el.size) < 0
    //      ? -(HEIGHT_CONTENT - (!el ? 0 : el.size))
    //      : HEIGHT_CONTENT - (!el ? 0 : el.size);
  };

  const addMargin = (arr: { size: number; day: number }[]) => {
    var margin = 0;
    margin =
      HEIGHT_CONTENT -
        (!sizeHeight[arr.length - 1] ? 0 : sizeHeight[arr.length - 1].size) <
      0
        ? -(
            HEIGHT_CONTENT -
            (!sizeHeight[arr.length - 1] ? 0 : sizeHeight[arr.length - 1].size)
          )
        : HEIGHT_CONTENT -
          (!sizeHeight[arr.length - 1] ? 0 : sizeHeight[arr.length - 1].size);
    setMarginDays((prev) => {
      prev.push(margin);
      var newArr = [...prev];
      return newArr;
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // console.log(position.value);
      contextY.value = position.value;
      // actualDays.push({ ...days[count], height: 1 });
    })
    .onUpdate((e) => {
      // if (e.translationY < contextY.value + sizeHeight[count + 1]) {
      //   position.value = e.translationY + contextY.value;
      // }
    })
    .onEnd((e) => {
      // console.log(sizeHeight[count]);
      if (e.velocityY < 0) {
        if (count.value === 6) count.value = 1;
        else {
          count.value = count.value + 1;
          console.log("tuda");
        }
        position.value = -posDays[count.value - 1];
        console.log(count.value);
      }
      if (e.velocityY > 0) {
        if (count.value === 1) count.value = 6;
        else {
          count.value = count.value - 1;
          console.log("suda");
        }
        position.value = -posDays[count.value - 1];
        console.log(count.value);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <Animated.View>
          {days.map((day, index) => {
            return (
              <View
                onLayout={(event) => measureView(event, day.dayOfWeek)}
                style={{
                  marginBottom: marginDays[index],
                }}
                key={index + "ds"}
              >
                <DayPage
                  day={day}
                  index={index}
                  translateY={position}
                  size={sizeHeight[index] ? sizeHeight[index].size : 0}
                />
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
