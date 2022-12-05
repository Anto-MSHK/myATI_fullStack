import {
  LayoutChangeEvent,
  Dimensions,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
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
} from "react-native-reanimated";
import { Button } from "@rneui/base";

const { height } = Dimensions.get("screen");

const END_POSITION = 200;
const HEIGHT_CONTENT = height - END_POSITION;

export function UltraView<dataType = any>(props: {
  data: dataType[];
  renderItem: (item: dataType, index: number) => React.ReactNode;
  curPage: { value: number; isChange: boolean };
  onSwipe?: (curPage: number) => void;
  onLayout: () => void;
  style: StyleProp<ViewStyle>;
}) {
  const [isStart, setIsStart] = useState(true);
  const position = useSharedValue(0);
  var opacity = [0, 0, 0, 0, 0, 0].map((el) => useSharedValue(el));
  var marginHorz = [0, 0, 0, 0, 0, 0].map((el) => useSharedValue(el));
  var sizeHeight = [0, 0, 0, 0, 0, 0].map((el) => useSharedValue(el));

  var contextY = useSharedValue(0);
  var contextAdvanced = useSharedValue(0);
  var contextOpacity = useSharedValue(0);

  var typeGesture = useSharedValue("");

  var count = useSharedValue(props.curPage.value);
  var [heightCards, setHeightCards] = useState<{ size: number; day: number }[]>(
    []
  );
  const [posCards, setPosCards] = useState<number[]>([]);
  const [marginCards, setMarginCards] = useState<number[]>([]);
  useEffect(() => {
    opacity = opacity.map((el, index) => {
      if (props.curPage.value === index) el.value = withSpring(1, configSpring);
      else el.value = withSpring(0, configSpring);
      return el;
    });

    marginHorz = marginHorz.map((el, index) => {
      if (props.curPage.value === index) el.value = withSpring(0, configSpring);
      else el.value = withSpring(15, configSpring);
      return el;
    });
    if (!isStart) {
      count.value = props.curPage.value;
      position.value = withSpring(-posCards[props.curPage.value], configSpring);
    }
  }, [props.curPage]);

  const measureHeight = (event: LayoutChangeEvent, dayOfWeek: number) => {
    if (
      posCards.length !== 6 ||
      (event.nativeEvent &&
        heightCards[dayOfWeek] &&
        heightCards[dayOfWeek].size !== event.nativeEvent.layout.height) ||
      dayOfWeek === posCards.length - 1
    ) {
      event.persist();
      setHeightCards((prev) => {
        prev[dayOfWeek] = {
          size: event.nativeEvent.layout.height,
          day: dayOfWeek,
        };
        prev.sort(function (a, b) {
          return a.day - b.day;
        });
        sizeHeight[dayOfWeek].value = event.nativeEvent.layout.height;
        addMargin(dayOfWeek);
        return prev;
      });
      if (marginCards.length === 6) {
        posAllCardsCalc(heightCards, marginCards);
      }
    } else if (posCards.length === 6 && isStart) {
      props.curPage.value = count.value;
      position.value = withSpring(-posCards[count.value], configSpring);
      setIsStart(false);
      props.onLayout();
    }
  };

  const addMargin = (day: number) => {
    var margin = 0;
    if (heightCards[day] && HEIGHT_CONTENT - heightCards[day].size <= 0)
      margin = HEIGHT_CONTENT / 4;
    else if (heightCards[day]) margin = HEIGHT_CONTENT - heightCards[day].size;
    setMarginCards((prev) => {
      prev[day] = margin;
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

  const callback = (count: number) => {
    props.onSwipe && props.onSwipe(count);
  };
  const configSpring = {
    damping: 8,
    mass: 0.45,
    stiffness: 60,
    restDisplacementThreshold: 0.1,
  };

  const positionX = useSharedValue(0);
  var contextX = useSharedValue(0);

  const horzGesture = Gesture.Pan()
    .onStart(() => {
      // if (typeGesture.value === "") {
      //   typeGesture.value = "horz";
      contextX.value = positionX.value;
      // }
    })
    .onUpdate((e) => {
      if (
        (typeGesture.value !== "vert" && e.translationX < -30) ||
        (typeGesture.value !== "vert" && e.translationX > 30)
      ) {
        positionX.value = contextX.value + e.translationX;
        typeGesture.value = "horz";
        console.log("horz");
      }
      if (typeGesture.value === "horz" || typeGesture.value === "")
        positionX.value = contextX.value + e.translationX;
    })
    .onEnd((e) => {
      typeGesture.value = "";
    });

  const vertGesture = Gesture.Pan()
    .onStart(() => {
      contextOpacity.value =
        heightCards[count.value].size - marginCards[count.value];
      if (heightCards[count.value].size >= HEIGHT_CONTENT) {
        if (posCards[count.value] === 0)
          contextAdvanced.value =
            posCards[count.value + 1] -
            heightCards[count.value].size +
            marginCards[count.value];
        else
          contextAdvanced.value =
            posCards[count.value] +
            heightCards[count.value].size -
            (HEIGHT_CONTENT - marginCards[count.value]);
      } else {
        contextAdvanced.value = 0;
      }
      contextY.value = position.value;
    })
    .onUpdate((e) => {
      console.log(e.translationY);

      if (
        (typeGesture.value !== "horz" && e.translationY < -30) ||
        (typeGesture.value !== "horz" && e.translationY > 30)
      ) {
        position.value = contextY.value + e.translationY;
        typeGesture.value = "vert";
        console.log("vert");
      }
      if (typeGesture.value === "vert" || typeGesture.value === "")
        position.value = contextY.value + e.translationY;
      // var procent = (Math.abs(e.translationY) * 100) / contextOpacity.value;

      // if (
      //   contextAdvanced.value === 0 ||
      //   position.value <= -contextAdvanced.value ||
      //   position.value > -posCards[count.value - 1]
      // ) {
      //   if (count.value !== 6) {
      //     opacity[count.value].value = procent / 100;
      //     marginHorz[count.value].value = 10 - procent / 5;
      //   }
      //   opacity[count.value - 1].value = 1 - procent / 100;
      //   marginHorz[count.value - 1].value = procent / 5;

      //   if (count.value !== 1) {
      //     opacity[count.value - 2].value = procent / 100;
      //     marginHorz[count.value - 2].value = -procent / 5;
      //   }
      // }
    })
    .onEnd((e) => {
      typeGesture.value = "";
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
          position.value > -posCards[count.value] &&
          e.translationY > minPulling;
      }

      var pushUp = e.velocityY < 0 && e.velocityY < -minVelocity;
      var pushDown = e.velocityY > 0 && e.velocityY > minVelocity;

      if (pushUp || pullingUp) {
        contextAdvanced.value = 0;
        if (count.value === 5) count.value = 0;
        else {
          count.value += 1;
        }
      }
      if (pushDown || pullingDown) {
        contextAdvanced.value = 0;
        if (count.value === 0) count.value = 5;
        else {
          count.value -= 1;
        }
      }
      if (contextAdvanced.value === 0) {
        position.value = withSpring(-posCards[count.value], configSpring);
      } else if (position.value <= -contextAdvanced.value) {
        position.value = withSpring(-contextAdvanced.value, configSpring);
      } else if (position.value > -posCards[count.value]) {
        position.value = withSpring(-posCards[count.value], configSpring);
      } else
        position.value = withDecay({
          velocity: e.velocityY,
          deceleration: 0.998,
          clamp: [-contextAdvanced.value, -posCards[count.value]],
        });

      if (count.value !== 5) {
        opacity[count.value + 1].value = withSpring(0, configSpring);
        marginHorz[count.value + 1].value = withSpring(10, configSpring);
      }
      opacity[count.value].value = withSpring(1, configSpring);
      marginHorz[count.value].value = withSpring(0, configSpring);
      if (count.value !== 0) {
        opacity[count.value - 1].value = withSpring(0, configSpring);
        marginHorz[count.value - 1].value = withSpring(10, configSpring);
      }
      runOnJS(callback)(count.value);
    });

  const composed = Gesture.Simultaneous(vertGesture, horzGesture);

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
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }],
  }));
  var styles = props.style;
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={composed}>
        <Animated.View style={animatedStyle2}>
          {props.data.map((day, index) => {
            return (
              <Animated.View
                onLayout={(event) => {
                  if (isStart) {
                    measureHeight(event, index);
                  }
                }}
                style={[
                  animatedStyle(index),
                  { marginBottom: marginCards[index] },
                ]}
                key={index + "swipe-page"}
              >
                <SwipePage
                  index={index}
                  translateY={position}
                  onChange={(event, dayOfWeek) => {
                    if (posCards.length !== 6 || count.value <= dayOfWeek) {
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
