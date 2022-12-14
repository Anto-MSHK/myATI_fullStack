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
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getGroupsByStorage, setGroup } from "../state/slices/group/groupSlice";
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { getWeek } from "../state/slices/settings/settingSlice";

const Stack = createStackNavigator();

export const Navigation: FC = () => {
  const { mode, setMode } = useThemeMode();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setMode("dark");
  }, []);

  const [mainGroup, setMainGroup] = useState("");
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    dispatch(getGroupsByStorage());
    dispatch(getWeek());
  }, []);

  const opt: StackNavigationOptions = {
    title: "Overview",
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={opt}
          initialParams={{ group: mainGroup }}
        />
        <Stack.Screen name="Groups" component={Groups} options={opt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
