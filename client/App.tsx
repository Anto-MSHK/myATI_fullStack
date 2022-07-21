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
import store from "./src/state/state";
import { createTheme, ThemeProvider } from "@rneui/themed";

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_400Regular_Italic,
    NotoSans_700Bold,
    NotoSans_700Bold_Italic,
  });

  const theme = createTheme({
    lightColors: {
      // primary: "#fff",
    },
    darkColors: {
      background: "rgba(35, 48, 64, 0.8)",
      grey0: "rgba(27, 32, 38, 0.6)",
      primary: "rgba(224, 142, 45, 0.9)",
      secondary: "rgba(119, 119, 119, 0.2)",
      searchBg: "rgba(255, 255, 255)",
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
