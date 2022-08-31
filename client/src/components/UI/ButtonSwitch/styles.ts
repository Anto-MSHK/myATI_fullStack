import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";

export const styles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    wrapper: { marginHorizontal: -25, marginTop: -10 },
    container: {
      backgroundColor: theme.colors.grey0,
      borderWidth: 0,
      borderRadius: 0,
      top: -10,
      // justifyContent: "center",
      // height: 35,
      borderBottomWidth: 2,
      height: 35,
      borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
    containerContent: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-end",
      // margin: 10,
    },
    text: {
      left: 3,
      marginRight: 5,
      ...UIstyles().h3,
    },
    selectedButton: {
      backgroundColor: theme.colors.secondary,
    },
  });
};
