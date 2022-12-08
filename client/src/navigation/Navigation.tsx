import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { Home } from "./../components/screens/Home/Home";
import { Groups } from "./../components/screens/Groups/Groups";
import { useThemeMode } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../hooks/redux";
import { setGroup } from "../state/slices/group/groupSlice";
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Navigation: FC = () => {
  const { mode, setMode } = useThemeMode();
  const dispatch = useAppDispatch();
  let isStart = true;
  useEffect(() => {
    setMode("dark");
  }, []);

  const [mainGroup, setMainGroup] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("@myGroups_Key").then((value) => {
      if (value !== null) {
        let arrGroups: any[] = JSON.parse(value);
        if (arrGroups.length !== 0)
          arrGroups.map((gr) => {
            const a = arrGroups.find((cand) => cand.isMain === true);
            dispatch(setGroup(gr));
            if (a.name) setMainGroup(a.name);
            else setMainGroup("none");
          });
        else setMainGroup("none");
        isStart = false;
      }
    });
  }, []);

  const opt: StackNavigationOptions = {
    title: "Overview",
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
  return (
    <NavigationContainer>
      {mainGroup === "none" ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Groups" component={Groups} options={opt} />
          <Stack.Screen name="Home" component={Home} options={opt} />
        </Stack.Navigator>
      ) : (
        mainGroup !== "" && (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={opt}
              initialParams={isStart ? { group: mainGroup } : undefined}
            />
            <Stack.Screen name="Groups" component={Groups} options={opt} />
          </Stack.Navigator>
        )
      )}
    </NavigationContainer>
  );
};

export default Navigation;
