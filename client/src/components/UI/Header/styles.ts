import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";

export const styles = StyleSheet.create({
  header: {
    height: 90,
  },
  textContainer: {
    justifyContent: "center",
  },
  text: {
    fontFamily: c_style.bold,
    fontSize: c_style.h2,

    color: c_style.darkT.color_p,
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
