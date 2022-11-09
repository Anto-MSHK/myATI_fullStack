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
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const position = useSharedValue(0);
  const positionButton = useSharedValue(0);
  const positionButton2 = useSharedValue(120);
  const contextY = useSharedValue(0);
  const heightComponent = useSharedValue(0);
  const heightButtons = useSharedValue(0);
  const { height } = Dimensions.get("screen");
  const END_POSITION = 80;
  const HEIGHT_CONTENT = height - END_POSITION;
  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = position.value;
    })
    .onUpdate((e) => {
      if (
        (position.value <= 0 || e.translationY < 0) &&
        (position.value >= -heightComponent.value + HEIGHT_CONTENT ||
          e.translationY > 0)
      )
        position.value = contextY.value + e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 0) {
        positionButton.value = withSpring(0);
      } else positionButton.value = withSpring(90);
      position.value = withDecay({
        velocity: e.velocityY,
        clamp: [-heightComponent.value + HEIGHT_CONTENT, 0],
      });
    });
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionButton.value }],
    };
  });
  const buttonStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionButton2.value }],
    };
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
  const { theme } = useTheme();

  //   const [heihgt, setHeihgt] = useState(0);
  const measureHeight = (event: LayoutChangeEvent) => {
    event.persist();
    return event.nativeEvent.layout.height;
  };
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Факультет:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        borderTopColor: "black",
        borderColor: "none",
        borderWidth: 1,
      },
      children: ["ФВО", "СПО"].map((el) => (
        <Badge
          value={el}
          badgeStyle={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.secondary,
          }}
        />
      )),
    },
    {
      title: "Курсы:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        borderTopColor: "black",
        borderColor: "none",
        borderWidth: 1,
      },
      children: ["1", "2", "3", "4"].map((el) => (
        <Badge
          value={el}
          badgeStyle={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.secondary,
          }}
        />
      )),
    },

    //  {
    //    containerStyle: { backgroundColor: "red" },
    //    titleStyle: { color: "white" },
    //    color: "white",
    //    icon: "close",
    //    onPress: () => setIsVisible(false),
    //  },
  ];

  const onToggle = () => {
    const curSize = 75;
    setIsVisible((prev) => !prev);
    if (!isVisible) {
      positionButton.value = withSpring(-(curSize * list.length - list.length));
      positionButton2.value = withSpring(0);
    } else {
      positionButton.value = withSpring(0);
      positionButton2.value = withSpring(curSize * list.length - list.length);
    }
  };
  const UIstyle = useStyles(UIstyles);
  return (
    <Layoult>
      <SafeAreaProvider>
        <View>
          <HeaderMain />
        </View>

        <GestureHandlerRootView>
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={scrollStyle}
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

        <BottomSheet
          modalProps={{
            animationType: "fade",
          }}
          isVisible={isVisible}
          onBackdropPress={onToggle}
          containerStyle={{ backgroundColor: "rgba(27, 32, 38, 0.4)" }}
        >
          <Animated.View style={buttonStyle2}>
            <Button
              onPress={onToggle}
              style={{ position: "absolute" }}
              radius={50}
              containerStyle={{
                marginLeft: 10,
                width: 60,
                marginBottom: 10,
              }}
              buttonStyle={{
                backgroundColor: "red",
                height: 60,
              }}
            >
              <Icon
                name="close"
                type="antdesign"
                size={30}
                color={"white"}
              ></Icon>
            </Button>
          </Animated.View>
          <View
            onLayout={(event) => {
              heightButtons.value = measureHeight(event);
            }}
          >
            {list.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}
              >
                {l.icon && (
                  <Icon
                    name={l.icon}
                    type="antdesign"
                    color="white"
                    size={25}
                  />
                )}
                {l.title && (
                  <Text
                    style={{
                      ...UIstyle.h2,
                      color: l.color,
                      marginLeft: 10,
                    }}
                  >
                    {l.title}
                  </Text>
                )}
                {l.children}
              </ListItem>
            ))}
          </View>
        </BottomSheet>
      </SafeAreaProvider>
      <Animated.View style={buttonStyle}>
        <Button
          onPress={onToggle}
          style={{ position: "absolute", zIndex: 1000, elevation: 1000 }}
          radius={50}
          containerStyle={{
            marginLeft: 10,
            width: 60,
            marginBottom: 10,
          }}
          buttonStyle={{
            height: 60,
          }}
          color={theme.colors.primary}
        >
          <Icon name="filter" type="antdesign" size={30} color={"white"}></Icon>
        </Button>
      </Animated.View>
    </Layoult>
  );
};
