import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";

export const styles = StyleSheet.create({
  wrapper: { marginHorizontal: -15 },
  container: {
    backgroundColor: c_style.darkT.secondary,
    borderWidth: 0,
    borderRadius: 0,
    top: -15,
    justifyContent: "center",
    height: 35,
    borderBottomWidth: 2,
    width: "100%",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  containerContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 10,
  },
  text: {
    left: 3,
    marginRight: 5,
    ...UIstyles.secondaryText,
  },
});
