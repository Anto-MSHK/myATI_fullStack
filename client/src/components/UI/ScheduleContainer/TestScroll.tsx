import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { DayPage } from "./DayPage";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Logs } from "expo";
import { DayT } from "../../../state/schedule/types";
import { useAppDispatch } from "./../../../hooks/redux";
import { setCurDayA } from "../../../state/appSettings/actions";
import { useDispatch } from "react-redux";

type day = DayT & { height: number };

const { height } = Dimensions.get("screen");

const END_POSITION = 200;
const HEIGHT_CONTENT = height - END_POSITION;

export const TestScroll = () => {
  Logs.enableExpoCliLogging();

  const position = useSharedValue(0);
  const positionType = useSharedValue("relative");
  const opacity = [1, 0, 0, 0, 0, 0].map((el) => useSharedValue(el));
  const marginHorz = [0, 15, 15, 15, 15, 15].map((el) => useSharedValue(el));
  var sizeHeight = [0, 0, 0, 0, 0, 0].map((el) => useSharedValue(el));
  const contextY = useSharedValue(0);
  const contextAdvanced = useSharedValue(0);
  const contextOpacity = useSharedValue(0);
  const test = useSharedValue(0);

  const count = useSharedValue(1);

  const days = useAppSelector((state) => state.schedule[0].days);
  const dispath = useDispatch();
  var [heightCards, setHeightCards] = useState<{ size: number; day: number }[]>(
    []
  );
  const [posCards, setPosCards] = useState<number[]>([]);
  const [marginCards, setMarginCards] = useState<number[]>([]);

  var [measureDone, setMeasureDone] = useState(false);

  const measureHeight = (event: LayoutChangeEvent, dayOfWeek: number) => {
    if (!measureDone) {
      console.log("bruh");

      setHeightCards((prev) => {
        var isExist = prev.find((el) => {
          if (el) return dayOfWeek === el.day;
          else return undefined;
        });
        if (event.nativeEvent && dayOfWeek && !isExist) {
          prev.push({ size: event.nativeEvent.layout.height, day: dayOfWeek });
          prev.sort(function (a, b) {
            return a.day - b.day;
          });
          sizeHeight[dayOfWeek - 1].value = event.nativeEvent.layout.height;
          console.log(sizeHeight[dayOfWeek - 1].value);
          addMargin(prev);
        }
        return prev;
      });

      if (marginCards.length === 6) {
        setMeasureDone(true);
        posAllCardsCalc(heightCards, marginCards);

        //   console.log(posCards);
        //   console.log(marginCards);
        //   console.log(heightCards);
      }
    }
  };

  const posAllCardsCalc = (
    size: { size: number; day: number }[],
    margin: number[]
  ) => {
    setPosCards((prev) => {
      for (var i = 0; i < size.length; i++) {
        var cardPos = 0;
        for (var j = 0; j <= i; j++) {
          cardPos += margin[j] + size[j].size;
        }
        prev.push(cardPos);
      }
      for (i = 0; i < 1; i++) prev.unshift(prev.pop() as number);
      prev[0] = 0;
      // console.log(prev);

      return [...prev];
    });
  };

  function callback(count: number) {
    //  "worklet";
    dispath(setCurDayA(count));
    //  console.log("2323");
  }
  const addMargin = (arr: { size: number; day: number }[]) => {
    var margin = 0;
    if (HEIGHT_CONTENT - heightCards[arr.length - 1].size <= 0)
      margin = HEIGHT_CONTENT / 4;
    else margin = HEIGHT_CONTENT - heightCards[arr.length - 1].size;
    setMarginCards((prev) => {
      prev.push(margin);
      var newArr = [...prev];
      return newArr;
    });
  };
  const configSpring = {
    damping: 8,
    mass: 0.45,
    stiffness: 60,
    restDisplacementThreshold: 0.1,
  };
  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextOpacity.value =
        heightCards[count.value - 1].size - marginCards[count.value - 1];
      // console.log(contextOpacity.value);
      if (heightCards[count.value - 1].size >= HEIGHT_CONTENT) {
        if (posCards[count.value - 1] === 0)
          contextAdvanced.value =
            posCards[count.value] -
            heightCards[count.value - 1].size +
            marginCards[count.value - 1];
        else
          contextAdvanced.value =
            posCards[count.value - 1] +
            heightCards[count.value - 1].size -
            (HEIGHT_CONTENT - marginCards[count.value - 1]);
      }
      contextY.value = position.value;
    })
    .onUpdate((e) => {
      // if (position.value > -contextAdvanced.value)
      position.value = contextY.value + e.translationY;
      var procent = (Math.abs(e.translationY) * 100) / contextOpacity.value;
      var procent2 = (Math.abs(e.translationY) * 10) / contextOpacity.value;
      // console.log(position.value);

      if (
        contextAdvanced.value === 0 ||
        position.value <= -contextAdvanced.value ||
        position.value > -posCards[count.value - 1]
      ) {
        if (count.value !== 6) {
          opacity[count.value].value = procent / 100;
          positionType.value = "absolute";
          marginHorz[count.value].value = 10 - procent / 5;
        }
        opacity[count.value - 1].value = 1 - procent / 100;
        positionType.value = "absolute";
        marginHorz[count.value - 1].value = procent / 5;

        if (count.value !== 1) {
          opacity[count.value - 2].value = procent / 100;
          positionType.value = "absolute";

          marginHorz[count.value - 2].value = -procent / 5;
        }
      }
      // }
      // console.log(position.value);
      // console.log(contextAdvanced.value);
    })
    .onEnd((e) => {
      var minVelocity = 1000;
      var minPulling = 200;

      var pullingUp = e.translationY < -minPulling;
      var pullingDown = e.translationY > minPulling;

      if (contextAdvanced.value !== 0) {
        minVelocity = 2500;
        pullingUp =
          position.value <= -contextAdvanced.value &&
          e.translationY < -minPulling;
        pullingDown =
          position.value > -posCards[count.value - 1] &&
          e.translationY > minPulling;
      }

      var pushUp = e.velocityY < 0 && e.velocityY < -minVelocity;
      var pushDown = e.velocityY > 0 && e.velocityY > minVelocity;

      if (pushUp || pullingUp) {
        contextAdvanced.value = 0;
        if (count.value === 6) count.value = 1;
        else {
          count.value = count.value + 1;
        }

        //   opacity.value[count.value - 2] = 0;
      }
      if (pushDown || pullingDown) {
        contextAdvanced.value = 0;
        if (count.value === 1) count.value = 6;
        else {
          count.value = count.value - 1;
        }
      }
      if (contextAdvanced.value === 0) {
        position.value = withSpring(-posCards[count.value - 1], {
          damping: 8,
          mass: 0.45,
          stiffness: 60,
          restDisplacementThreshold: 0.1,
        });
      } else if (position.value <= -contextAdvanced.value) {
        position.value = withSpring(-contextAdvanced.value, configSpring);
      } else if (position.value > -posCards[count.value - 1]) {
        position.value = withSpring(-posCards[count.value - 1], configSpring);
      } else
        position.value = withDecay({
          velocity: e.velocityY,
          deceleration: 0.998,
          clamp: [-contextAdvanced.value, -posCards[count.value - 1]],
        });

      // if (position.value <= -posCards[count.value - 1]) {
      if (count.value !== 6) {
        opacity[count.value].value = withSpring(0, configSpring);
        marginHorz[count.value].value = withSpring(10, configSpring);
      }
      opacity[count.value - 1].value = withSpring(1, configSpring);
      marginHorz[count.value - 1].value = withSpring(0, configSpring);
      if (count.value !== 1) {
        opacity[count.value - 2].value = withSpring(0, configSpring);
        marginHorz[count.value - 2].value = withSpring(10, configSpring);
      }
      runOnJS(callback)(count.value - 1);
    });

  const animatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      if (sizeHeight[index].value !== 0)
        return {
          opacity: opacity[index].value,
          marginHorizontal: marginHorz[index].value,
          height: sizeHeight[index].value,
          //   position: positionType.value as "relative" | "absolute",
        };
      else
        return {
          opacity: opacity[index].value,
          marginHorizontal: marginHorz[index].value,
        };
    });
  };
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ zIndex: 0, elevation: 0 }}>
          {days.map((day, index) => {
            return (
              <Animated.View
                onLayout={(event) => measureHeight(event, day.dayOfWeek)}
                style={[
                  animatedStyle(index),
                  { marginBottom: marginCards[index] },
                ]}
                key={index + "ds"}
              >
                <DayPage
                  day={day}
                  index={index}
                  translateY={position}
                  size={heightCards[index] ? heightCards[index].size : 0}
                />
              </Animated.View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    //  justifyContent: "center",
  },
});
