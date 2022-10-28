import {
  SegmentedControlIOSComponent,
  StyleSheet,
  Text,
  View,
  ScrollView,
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
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((e) => {})
    .onEnd((e) => {});
  const contextY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: contextY.value }],
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
        {!loading ? (
          <ScrollView style={styles.contentContainer}>
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
          </ScrollView>
        ) : (
          <Button
            size="lg"
            loadingProps={{ size: "large" }}
            loading
            type="clear"
            style={{ position: "absolute" }}
          />
        )}
        {!loading && (
          <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
              <Button
                onPress={() => setIsVisible(true)}
                style={[
                  animatedStyle,
                  { flex: 0, position: "absolute", bottom: 0 },
                ]}
                buttonStyle={{ height: 58 }}
                color={theme.colors.primary}
              >
                <Text style={{ ...UIstyle.h2 }}>Фильтр</Text>
              </Button>
            </GestureDetector>
          </GestureHandlerRootView>
        )}
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
