import { StyleSheet } from "react-native";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";

export const styles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    //  el: {
    //    zIndex: 4,
    //    elevation: 4,
    //  },
  });
};
