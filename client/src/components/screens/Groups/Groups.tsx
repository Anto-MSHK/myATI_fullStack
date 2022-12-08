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
import { GroupCard } from "./../../UI/GroupCard/GroupCard";
import { HomeTabScreenProps } from "../../../navigation/types";
import { Badge, BottomSheet, Button, Icon, ListItem } from "@rneui/base";
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
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BottomList, ButtonCloseList } from "../../UI/BottomList/BottomList";
import { useGetGroupsQuery } from "../../../state/services/group";
import { StackActions, NavigationAction } from "@react-navigation/native";
import { Loading } from "../../UI/Loading/Loading";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const { theme } = useTheme();
  const styleUI = useStyles(UIstyles);
  const curSize = 63;

  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");

  const list = [
    {
      title: "Факультет:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
        marginTop: 10,
        marginBottom: 5,
      },
      children: ["FVO", "SPO"].map((el) => (
        <Button
          buttonStyle={{
            height: 40,
            backgroundColor:
              el === faculty ? theme.colors.primary : theme.colors.grey3,
            borderWidth: 0,
          }}
          containerStyle={{ borderRadius: 10, ...(styleUI.shadow as any) }}
          onPress={() => {
            setFaculty(el);
            position.value = 0;
          }}
        >
          {el}
        </Button>
      )),
    },

    {
      title: "Курс:",
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
        marginBottom: 5,
      },
      children: ["1", "2", "3", "4"].map((el) => (
        <Button
          buttonStyle={{
            width: 40,
            height: 40,
            backgroundColor:
              el === course ? theme.colors.primary : theme.colors.grey3,
            borderWidth: 0,
          }}
          containerStyle={{ borderRadius: 10, ...(styleUI.shadow as any) }}
          onPress={() => {
            setCourse(el);
            position.value = 0;
          }}
        >
          {el}
        </Button>
      )),
    },
    {
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
        marginTop: 5,
        marginBottom: 2,
      },
      children: (
        <Button
          containerStyle={{ marginHorizontal: 10, borderRadius: 20, flex: 1 }}
          color={theme.colors.grey4}
          onPress={() => {
            setFaculty("");
            setCourse("");
            position.value = 0;
          }}
        >
          Очистить
        </Button>
      ),
    },
  ];
  const { height } = Dimensions.get("screen");
  const END_POSITION = 80;
  const HEIGHT_CONTENT = height - END_POSITION;

  const position = useSharedValue(0);

  const posModal = useSharedValue(curSize * list.length - list.length);
  const opacityBG = useSharedValue(0);
  const heightBG = useSharedValue(-300);

  const posBtnOpen = useSharedValue(0);
  const colorBtn = useSharedValue(0);

  const opacityIconOpen = useSharedValue(100);
  const opacityIconClose = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(false);
  const contextY = useSharedValue(0);
  const heightComponent = useSharedValue(0);

  const onToggle = () => {
    setIsVisible((prev) => !prev);
    if (!isVisible) {
      posBtnOpen.value = withSpring(-(curSize * list.length - list.length));
      posModal.value = withSpring(0, {
        damping: 12,
      });
      opacityBG.value = withSpring(1);
      heightBG.value = withSpring(HEIGHT_CONTENT);
      colorBtn.value = withSpring(1);
      opacityIconOpen.value = withSpring(0);
      opacityIconClose.value = withSpring(100);
    } else {
      posBtnOpen.value = withSpring(0);
      posModal.value = withSpring(curSize * list.length - list.length, {
        damping: 12,
      });
      opacityBG.value = withSpring(0);
      heightBG.value = withSpring(-300);
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

  const { data, error, isLoading } = useGetGroupsQuery({ faculty, course });

  const measureHeight = (event: LayoutChangeEvent) => {
    event.persist();
    return event.nativeEvent.layout.height;
  };
  return (
    <Layoult>
      <View>
        <HeaderMain title="Выберите группу" />
      </View>
      {!isLoading && data?.length > 0 ? (
        <View>
          <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
              <Animated.View
                style={[scrollStyle, { paddingHorizontal: 10, zIndex: 1 }]}
                onLayout={(event) => {
                  heightComponent.value = measureHeight(event);
                }}
              >
                {data &&
                  data.map((group) => {
                    if (group.faculty === "FVO")
                      return (
                        <GroupCard
                          onClickNav={(group: string) => {
                            navigation.navigate("Home", { group: group });
                          }}
                          name={group.name}
                          faculty={group.faculty}
                          key={`${group.name}gr`}
                        />
                      );
                  })}
                {data &&
                  data.map((group) => {
                    if (group.faculty === "SPO")
                      return (
                        <GroupCard
                          onClickNav={(group: string) => {
                            navigation.navigate("Home", { group: group });
                          }}
                          name={group.name}
                          faculty={group.faculty}
                          key={`${group.name}gr2`}
                        />
                      );
                  })}
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
      ) : (
        <Loading withGroups />
      )}
      <ButtonCloseList
        posBtnOpen={posBtnOpen}
        iconName={"filter"}
        onToggle={onToggle}
        colorBtn={colorBtn}
        visible={isVisible}
        opacityIconOpen={opacityIconOpen}
        opacityIconClose={opacityIconClose}
        tags={[{ value: faculty }, { value: course, name: "курс" }]}
      />
      <BottomList
        visible={isVisible}
        list={list}
        heightScreen={heightBG}
        posModal={posModal}
        onToggle={onToggle}
        opacityBackground={opacityBG}
      />
    </Layoult>
  );
};
