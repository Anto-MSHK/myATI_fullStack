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
    borderColor: "none",
    borderWidth: 0,
  };

  return StyleSheet.create({
    stripe: {
      backgroundColor: theme.colors.black,

      width: "50%",
      height: 1,
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
      borderBottomWidth: 0,
    },

    cardContainer_top: {
      ...cardContainer,

      overflow: "hidden",
      borderBottomWidth: 0,

      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },

    cardContainer_bottom: {
      ...cardContainer,

      borderTopWidth: 0,

      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },

    cardWrapper: {},

    //* ~~> main
    mainContainer: {
      flexDirection: "row",
      alignItems: "center",

      marginBottom: 10,
    },

    //? -> budge
    budgeContainer: {
      alignSelf: "flex-start",
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



      alignItems: "flex-end",
      justifyContent: "center",
    },

    budgeText: {
      fontFamily: c_style.bold,
      fontSize: c_style.h3,
      color: theme.colors.black,

      marginRight: 5,
    },

    //* ~~> secondary
    secondaryContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.colors.grey0,
      paddingTop: 5,
      paddingBottom: 5,
      marginHorizontal: -15,
    },

    secondaryInfo: {
      flex: 1,
      marginRight: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    //? --> time
    timeContainer: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      width: 65,
    },

    //? --> bottom line
    gradientLine: { height: 2, bottom: -15, left: -15, marginRight: -30 },
  });
};
