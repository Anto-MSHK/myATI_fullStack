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
import { BottomSheet, Button, Icon, ListItem } from "@rneui/base";
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
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const position = useSharedValue(0);
  const contextY = useSharedValue(0);
  const heightComponent = useSharedValue(0);
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
      console.log(position.value);
    })
    .onEnd((e) => {
      position.value = withDecay({
        velocity: e.velocityY,
        clamp: [-heightComponent.value + HEIGHT_CONTENT, 0],
      });
    });
  const buttonStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: contextY.value }],
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
    heightComponent.value = event.nativeEvent.layout.height;
  };
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "ФВО",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        borderTopColor: "black",
        borderColor: "none",
        borderWidth: 1,
      },
    },
    {
      title: "СПО",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey0,
        borderTopColor: "black",
        borderColor: "none",
        borderWidth: 1,
      },
    },
    {
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      color: "white",
      icon: "close",
      onPress: () => setIsVisible(false),
    },
  ];
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
                measureHeight(event);
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
        <Button
          onPress={() => setIsVisible(true)}
          style={{ position: "absolute", bottom: 0 }}
          buttonStyle={{ height: 58 }}
          color={theme.colors.primary}
        >
          <Text style={{ ...UIstyle.h2 }}>Фильтр</Text>
        </Button>
        <Animated.View></Animated.View>

        <Button
          size="lg"
          loadingProps={{ size: "large" }}
          loading
          type="clear"
          style={{ position: "absolute" }}
        />

        <BottomSheet
          modalProps={{ animationType: "fade" }}
          isVisible={isVisible}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    ...l.titleStyle,
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      //  justifyContent: "center",
                    }}
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
                  </View>
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </SafeAreaProvider>
    </Layoult>
  );
};
