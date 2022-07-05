import { StyleSheet } from "react-native";
import { c_style } from "./../../../stylesConst";

export const styles = StyleSheet.create({
  //* ~~> text
  mainText: {
    fontFamily: c_style.bold,
    fontSize: c_style.h3,
    color: c_style.darkT.color_p,

    width: 240,
    lineHeight: 18,
  },

  secondaryText_b: {
    fontFamily: c_style.bold,
    fontSize: c_style.h4,
    color: c_style.darkT.color_p,
  },

  secondaryText: {
    color: c_style.darkT.color_p,

    lineHeight: 18,
    marginLeft: 15,
  },

  stripe: {
    backgroundColor: c_style.darkT.color_p,

    width: "50%",
    height: 2,
  },

  //* ~~> card
  cardContainer: {
    backgroundColor: c_style.darkT.primary,
  },

  cardContainer_all: {
    backgroundColor: c_style.darkT.primary,

    borderRadius: 15,
  },

  cardContainer_top: {
    backgroundColor: c_style.darkT.primary,

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },

  cardContainer_bottom: {
    backgroundColor: c_style.darkT.primary,

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

    backgroundColor: c_style.darkT.dominant,

    alignItems: "flex-end",
    justifyContent: "center",
  },

  budgeText: {
    fontFamily: c_style.bold,
    fontSize: c_style.h3,
    color: c_style.darkT.color_s,

    marginRight: 5,
  },

  //* ~~> secondary
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",

    backgroundColor: c_style.darkT.secondary,

    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: -15,
  },

  //? --> time
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    width: 65,
  },
});
