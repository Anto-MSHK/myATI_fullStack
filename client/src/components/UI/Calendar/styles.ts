import { StyleSheet } from "react-native";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";

export const styles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    calendarContainer: {
      padding: 0,
      margin: 0,
      borderBottomLeftRadius: 25,
      borderBottomEndRadius: 25,
      backgroundColor: theme.colors.grey0,
      //   borderWidth: 0,
      ...UIstyles().shadow,
      borderBottomWidth: 4,
    },
    buttonsContainer: {
      marginTop: 10,
      borderWidth: 0,
      backgroundColor: "rgba(0, 0, 0, 0)",
      height: 36,
    },
    buttonContainer: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 50,
      overflow: "hidden",
      marginHorizontal: 9,
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
    },
    mainContentText: { ...UIstyles().h3_b },

    infoContainer: {
      marginTop: 8,
      marginBottom: 10,
    },
  });
};
