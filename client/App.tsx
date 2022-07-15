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

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_400Regular_Italic,
    NotoSans_700Bold,
    NotoSans_700Bold_Italic,
  });

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
}
