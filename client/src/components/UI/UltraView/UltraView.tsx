import { LayoutChangeEvent, Dimensions } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { SwipePage } from "./SwipePage";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Logs } from "expo";

const { height } = Dimensions.get("screen");

const END_POSITION = 200;
const HEIGHT_CONTENT = height - END_POSITION;

export function UltraView<dataType = any>(props: {
  data: dataType[];
  renderItem: (item: dataType, index: number) => React.ReactNode;
  defaultCur: number;
  onSwipe?: (curPage: number) => void;
}) {
  Logs.enableExpoCliLogging();

  const position = useSharedValue(0);
  const opacity = props.data.map((_, index) => {
    if (props.defaultCur === index) return useSharedValue(1);
    else return useSharedValue(0);
  });

  const marginHorz = props.data.map((_, index) => {
    if (props.defaultCur === index) return useSharedValue(0);
    else return useSharedValue(15);
  });

  var sizeHeight = props.data.map(() => useSharedValue(0));
  const contextY = useSharedValue(0);
  const contextAdvanced = useSharedValue(0);
  const contextOpacity = useSharedValue(0);

  const count = useSharedValue(props.defaultCur + 1);

  var [heightCards, setHeightCards] = useState<{ size: number; day: number }[]>(
    []
  );
  const [posCards, setPosCards] = useState<number[]>([]);
  const [marginCards, setMarginCards] = useState<number[]>([]);
  const [isStart, setIsStart] = useState(true);

  //   useEffect(() => {
  //     if (posCards.length === 6 && isStart) {
  //       console.log(posCards[count.value - 1] + " " + "dsds");
  //       position.value = withTiming(posCards[count.value - 1], {
  //         duration: 50900,
  //       });
  //       console.log(position.value + " " + "dsdsdssds");
  //       setIsStart(false);
  //     }
  //   }, [posCards]);
  const measureHeight = (event: LayoutChangeEvent, dayOfWeek: number) => {
    if (
      posCards.length !== 6 ||
      (event.nativeEvent &&
        heightCards[dayOfWeek - 1] &&
        heightCards[dayOfWeek - 1].size !== event.nativeEvent.layout.height)
    ) {
      event.persist();
      setHeightCards((prev) => {
        if (event.nativeEvent && dayOfWeek) {
          prev[dayOfWeek - 1] = {
            size: event.nativeEvent.layout.height,
            day: dayOfWeek - 1,
          };
          prev.sort(function (a, b) {
            return a.day - b.day;
          });
          sizeHeight[dayOfWeek - 1].value = event.nativeEvent.layout.height;
          addMargin(dayOfWeek);
        }
        return prev;
      });
      if (marginCards.length === 6) {
        posAllCardsCalc(heightCards, marginCards);
      }
      console.log(heightCards);
      console.log(marginCards);
      console.log(posCards);
    } else if (posCards.length === 6 && isStart) {
      position.value = withSpring(-posCards[count.value - 1], configSpring);
      console.log(position.value);
      setIsStart(false);
    }
  };

  const addMargin = (day: number) => {
    var margin = 0;
    if (HEIGHT_CONTENT - heightCards[day - 1].size <= 0)
      margin = HEIGHT_CONTENT / 4;
    else margin = HEIGHT_CONTENT - heightCards[day - 1].size;
    setMarginCards((prev) => {
      prev[day - 1] = margin;
      var newArr = [...prev];
      return newArr;
    });
  };

  const posAllCardsCalc = (
    size: { size: number; day: number }[],
    margin: number[]
  ) => {
    setPosCards((prev) => {
      for (var i = 0; i < size.length; i++) {
        var cardPos = 0;
        for (var j = 0; j <= i; j++) {
          if (size[j]) cardPos += margin[j] + size[j].size;
        }
        prev[i] = cardPos;
      }
      for (i = 0; i < 1; i++) prev.unshift(prev.pop() as number);
      prev[0] = 0;
      return [...prev];
    });
  };

  function callback(count: number) {
    props.onSwipe && props.onSwipe(count);
  }
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
      } else {
        contextAdvanced.value = 0;
      }
      contextY.value = position.value;
    })
    .onUpdate((e) => {
      position.value = contextY.value + e.translationY;
      var procent = (Math.abs(e.translationY) * 100) / contextOpacity.value;

      if (
        contextAdvanced.value === 0 ||
        position.value <= -contextAdvanced.value ||
        position.value > -posCards[count.value - 1]
      ) {
        if (count.value !== 6) {
          opacity[count.value].value = procent / 100;
          marginHorz[count.value].value = 10 - procent / 5;
        }
        opacity[count.value - 1].value = 1 - procent / 100;
        marginHorz[count.value - 1].value = procent / 5;

        if (count.value !== 1) {
          opacity[count.value - 2].value = procent / 100;
          marginHorz[count.value - 2].value = -procent / 5;
        }
      }
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
        runOnJS(callback)(count.value - 1);
      }
      if (pushDown || pullingDown) {
        contextAdvanced.value = 0;
        if (count.value === 1) count.value = 6;
        else {
          count.value = count.value - 1;
        }
        runOnJS(callback)(count.value - 1);
      }
      if (contextAdvanced.value === 0) {
        position.value = withSpring(-posCards[count.value - 1], configSpring);
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
    });

  const animatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      if (sizeHeight[index].value !== 0)
        return {
          opacity: opacity[index].value,
          marginHorizontal: marginHorz[index].value,
          height: sizeHeight[index].value,
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
          {props.data.map((day, index) => {
            return (
              <Animated.View
                onLayout={(event) => {
                  measureHeight(event, index + 1);
                }}
                style={[
                  animatedStyle(index),
                  { marginBottom: marginCards[index] },
                ]}
                key={index + "swipe-page"}
              >
                <SwipePage
                  index={index + 1}
                  translateY={position}
                  onChange={(event, dayOfWeek) => {
                    if (posCards.length !== 6 || count.value === dayOfWeek) {
                      measureHeight(event, dayOfWeek);
                    }
                  }}
                >
                  {props.renderItem(day, index)}
                </SwipePage>
              </Animated.View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
