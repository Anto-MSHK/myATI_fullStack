import { StyleSheet } from "react-native";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";

export const styles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    calendarContainer: {
      zIndex: 1,
      padding: 0,
      margin: 0,
      borderBottomLeftRadius: 25,
      borderBottomEndRadius: 25,
      backgroundColor: theme.colors.grey0,
      borderWidth: 0,
    },
    buttonsContainer: {
      marginTop: 10,
      borderWidth: 0,
      backgroundColor: "rgba(0, 0, 0, 0)",
      justifyContent: "space-between",
      height: 36,
    },
    buttonContainer: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 50,
      overflow: "hidden",
      width: 39,
      flex: 0,
      // marginHorizontal: 9,
      borderColor: "rgba(0, 0, 0, 0)",
    },
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },

    buttonContentContainer: {
      flexDirection: "column",
      alignItems: "center",
    },

    secondaryContentText: {
      marginBottom: -4,
      // fontSize: 10,
      ...UIstyles().h4,
      color: theme.colors.white,
    },
    mainContentText: { ...UIstyles().h3_b, color: theme.colors.white },

    infoContainer: {
      marginTop: 8,
      marginBottom: 10,
    },
  });
};
