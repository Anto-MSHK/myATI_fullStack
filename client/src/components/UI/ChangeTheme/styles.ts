import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { c_style } from "../../../stylesConst";
import { UIstyles } from "../UIstyles";

export const styles = () => {
  const { theme } = useTheme();

  const cardContainer = {
    ...UIstyles().shadow,
    backgroundColor: theme.colors.grey0,
    marginVertical: 0,
    margin: 0,
    flexDirection: "column",
  };

  return StyleSheet.create({
    h1: {
      fontFamily: c_style.bold,
      fontSize: 28,
      color: theme.colors.black,
    },
    //* ~~> card

    cardContainer_none: {
      ...cardContainer,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderTopRightRadius: 0.1,
      borderTopLeftRadius: 0.1,
    },

    cardContainer_all: {
      ...cardContainer,

      overflow: "hidden",
      borderRadius: 15,
      marginVertical: 10,
      borderColor: "black",
      borderWidth: 0,
    },
  });
};
