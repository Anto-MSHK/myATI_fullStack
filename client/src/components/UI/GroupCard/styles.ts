import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";

export const styles = () => {
  const { theme } = useTheme();

  const cardContainer = {
    ...UIstyles().shadow,
    backgroundColor: theme.colors.background,
    marginVertical: 0,
    margin: 0,
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

    cardWrapper: {},

    //* ~~> main
    mainContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    //? -> budge
    budgeContainer: {
      left: -15,
      marginRight: 15,
    },

    budge: {
      marginRight: -15,
      borderWidth: 0,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,

      width: 65,
      height: 25,

      backgroundColor: theme.colors.secondary,

      alignItems: "flex-end",
    },

    budgeText: {
      fontFamily: c_style.bold,
      fontSize: c_style.h3,
      color: theme.colors.grey1,

      marginRight: 5,
    },
  });
};
