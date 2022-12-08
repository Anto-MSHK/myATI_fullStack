import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";

export const styles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    header: {
      zIndex: 10,
      elevation: 10,
      height: 90,
    },
    textContainer: {
      justifyContent: "center",
      overflow: "visible",
    },
    buttonContainer: {
      justifyContent: "center",
      overflow: "hidden",

      borderRadius: 50,
    },
    button: {
      justifyContent: "center",

      width: 40,
      height: 40,
    },
  });
};
