import {
  SegmentedControlIOSComponent,
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React, { useEffect, useState } from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { UltraView } from "../../UI/UltraView/UltraView";
import { useDispatch } from "react-redux";
import store from "../../../state/state";
import { AnyAction } from "redux";
import { GroupCard } from "./../../UI/GroupCard/GroupCard";
import { getGroups } from "./../../../state/group/reducer";
import { HomeTabScreenProps } from "../../../navigation/types";
import { isLoadingA } from "./../../../state/schedule/actions";
import { isLoadingGroupA } from "../../../state/group/actions";
import { Badge, BottomSheet, Button, Icon, ListItem } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useStyles } from "../../../hooks/useStyles";
import { UIstyles } from "./../../UI/UIstyles";
import { useTheme } from "@rneui/themed";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  BottomList,
  ButtonCloseList,
} from "../../UI/BottomList/BottomList";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const { theme } = useTheme();
  const styleUI = useStyles(UIstyles);
  const curSize = 73;
  const list = [
    {
      title: "Факультет:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
      },
      children: ["ФВО", "СПО"].map((el) => (
        <Badge
          value={el}
          badgeStyle={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.grey3,
            borderWidth: 0,
            ...(styleUI.shadow as any),
          }}
        />
      )),
    },

    {
      title: "Курс:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
      },
      children: ["1", "2", "3", "4"].map((el) => (
        <Badge
          value={el}
          badgeStyle={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.grey3,
            borderWidth: 0,
            ...(styleUI.shadow as any),
          }}
        />
      )),
    },
  ];

  const position = useSharedValue(0);

  const posModal = useSharedValue(curSize * list.length - list.length);
  const opacityBG = useSharedValue(0);

  const posBtnOpen = useSharedValue(0);
  const colorBtn = useSharedValue(0);

  const opacityIconOpen = useSharedValue(100);
  const opacityIconClose = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(false);
  const contextY = useSharedValue(0);
  const heightComponent = useSharedValue(0);

  const { height } = Dimensions.get("screen");
  const END_POSITION = 80;
  const HEIGHT_CONTENT = height - END_POSITION;

  const onToggle = () => {
    setIsVisible((prev) => !prev);
    if (!isVisible) {
      posBtnOpen.value = withSpring(-(curSize * list.length - list.length));
      posModal.value = withSpring(0);
      opacityBG.value = withSpring(100);
      colorBtn.value = withSpring(1);
      opacityIconOpen.value = withSpring(0);
      opacityIconClose.value = withSpring(100);
    } else {
      posBtnOpen.value = withSpring(0);
      posModal.value = withSpring(curSize * list.length - list.length);
      opacityBG.value = withSpring(0);
      colorBtn.value = withSpring(0);
      opacityIconOpen.value = withSpring(100);
      opacityIconClose.value = withSpring(0);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = position.value;
    })
    .onUpdate((e) => {
      const heightAllCards = -heightComponent.value + HEIGHT_CONTENT - 20;
      if (
        (position.value <= 0 || e.translationY < 0) &&
        (position.value >= heightAllCards || e.translationY > 0)
      )
        position.value = contextY.value + e.translationY;
    })
    .onEnd((e) => {
      const heightAllCards = -heightComponent.value + HEIGHT_CONTENT - 20;
      if (e.translationY > 0) {
        posBtnOpen.value = withSpring(0);
      } else posBtnOpen.value = withSpring(90);
      position.value = withDecay({
        velocity: e.velocityY,
        clamp: [heightAllCards, 0],
      });
    });

  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoadingGroupA(true));
    dispatch(getGroups() as any);
  }, []);

  var groups = useAppSelector((state) => state.groups.groups);
  var loading = useAppSelector((state) => state.groups.isLoading);

  const measureHeight = (event: LayoutChangeEvent) => {
    event.persist();
    return event.nativeEvent.layout.height;
  };
  return (
    <Layoult>
      <View>
        <HeaderMain />
      </View>

      <GestureHandlerRootView>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[scrollStyle, { paddingHorizontal: 10 }]}
            onLayout={(event) => {
              heightComponent.value = measureHeight(event);
            }}
          >
            {groups.map((group) => (
              <GroupCard
                onClickNav={(group: string) => {
                  dispatch(isLoadingA(true));
                  navigation.navigate("Home", { group: group });
                }}
                name={group.name}
                faculty={group.faculty}
              />
            ))}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <ButtonCloseList
        posBtnOpen={posBtnOpen}
        onToggle={onToggle}
        colorBtn={colorBtn}
        visible={isVisible}
        opacityIconOpen={opacityIconOpen}
        opacityIconClose={opacityIconClose}
      />
      <BottomList
        visible={isVisible}
        list={list}
        heightScreen={HEIGHT_CONTENT}
        posModal={posModal}
        onToggle={onToggle}
        opacityBackground={opacityBG}
      />
    </Layoult>
  );
};
