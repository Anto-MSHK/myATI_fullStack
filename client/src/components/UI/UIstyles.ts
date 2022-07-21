import { useTheme } from "@rneui/themed";
import { c_style } from "./../../stylesConst";

export const UIstyles = () => {
  const { theme } = useTheme();

  return {
    //* ~~> text
    h0: {
      fontFamily: c_style.bold,
      fontSize: 24,
      color: theme.colors.black,
    },

    h1_b: {
      fontFamily: c_style.bold,
      fontSize: c_style.h1,
      color: theme.colors.primary,
    },

    h1_p: {
      fontFamily: c_style.bold,
      fontSize: c_style.h1,
      color: theme.colors.primary,
    },

    h1: {
      fontFamily: c_style.regular,
      fontSize: c_style.h1,
      color: theme.colors.black,
    },

    h2: {
      fontFamily: c_style.bold,
      fontSize: c_style.h2,
      color: theme.colors.black,
    },

    h2_p: {
      fontFamily: c_style.bold,
      fontSize: c_style.h2,
      color: theme.colors.primary,
    },

    h3_b: {
      fontFamily: c_style.bold,
      fontSize: c_style.h3,
      color: theme.colors.black,
    },

    h3_p: {
      fontFamily: c_style.bold,
      fontSize: c_style.h3,
      color: theme.colors.primary,
    },

    h3: {
      color: theme.colors.black,
      fontSize: c_style.h3,

      lineHeight: 18,
    },

    h4_b: {
      fontFamily: c_style.bold,
      fontSize: c_style.h4,
      color: theme.colors.black,
    },

    h4: {
      color: theme.colors.black,
      fontSize: c_style.h4,

      lineHeight: 18,
    },

    h5_b: {
      fontFamily: c_style.bold,
      fontSize: c_style.h5,
      color: theme.colors.black,
    },

    h5: {
      color: theme.colors.black,
      fontSize: c_style.h5,

      lineHeight: 18,
    },

    shadow: {
      borderWidth: 2,
      borderColor: "rgba(0, 0, 0, 0.2)",
      shadowColor: "rgba(0, 0, 0, 0.2)",
    },
  };
};
