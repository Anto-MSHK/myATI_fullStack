import { View, Text } from "react-native";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./../components/screens/Home/Home";

const Stack = createNativeStackNavigator();

export const Navigation: FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
