import { View, Text, Animated, FlatList, Dimensions } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import DayCard from "../DayCard/DayCard";

const { width, height } = Dimensions.get("screen");

export const ScheduleContainer = () => {
  const days = useAppSelector((state) => state.schedule[0].days);
  var [hComp, setHComp] = useState("");
  const HEIGHT = height * 0.75;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const measureView = (event: any) => {
    console.log("event peroperties: ", event);
    setHComp(event.nativeEvent.layout.height);
  };

  return (
    <View style={{ height: HEIGHT, overflow: "hidden" }}>
      <Animated.FlatList
        data={days}
        scrollEventThrottle={24}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        snapToInterval={HEIGHT + +hComp}
        bounces={false}
        pagingEnabled
        decelerationRate={"normal"}
        renderItem={({ item }) => (
          <View
            onLayout={(event) => measureView(event)}
            style={{ height: HEIGHT, marginBottom: +hComp }}
          >
            <DayCard dayOfWeek={item.dayOfWeek} lessons={item.lessons} />
            <Text>{hComp}</Text>
          </View>
        )}
      />
    </View>
  );
};
