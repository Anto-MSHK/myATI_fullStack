import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./src/navigation/Navigation";
import {
  NotoSans_400Regular,
  NotoSans_400Regular_Italic,
  NotoSans_700Bold,
  NotoSans_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider, useThemeMode } from "@rneui/themed";
import { registerRootComponent } from "expo";
import { useEffect } from "react";
import { store } from "./src/state/state";
import { useAppDispatch } from "./src/hooks/redux";
import { setCurDayAndWeek } from "./src/state/slices/settings/settingSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setGroup } from "./src/state/slices/group/groupSlice";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_400Regular_Italic,
    NotoSans_700Bold,
    NotoSans_700Bold_Italic,
  });

  const theme = createTheme({
    lightColors: {
      primary: "rgba(224, 142, 45, 1)",
      black: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.2)",
      grey0: "rgba(232, 232, 232, 1)",
      grey1: "rgba(217, 217, 217, 1)",
      grey2: "rgba(247, 247, 247, 1)",
      grey5: "rgba(209, 209, 209, 1)",
    },
    darkColors: {
      background: "rgba(35, 48, 64, 1)",
      grey0: "rgba(27, 32, 38, 1)",
      primary: "rgba(224, 142, 45, 1)",
      secondary: "rgba(255, 255, 255, 0.2)",
      searchBg: "rgba(255, 255, 255)",
      black: "rgba(255, 255, 255, 1)",
      white: "rgba(255, 255, 255, 1)",
    },
  });


  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </Provider>
    );
}

registerRootComponent(App);
