import { View, Text } from "react-native";
import React, { FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./../components/screens/Home/Home";
import { Groups } from "./../components/screens/Groups/Groups";
import { useThemeMode } from "@rneui/themed";

const Stack = createNativeStackNavigator();

export const Navigation: FC = () => {
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    setMode("dark");
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Groups"
          component={Groups}
          options={{ title: "Overview" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Overview" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
