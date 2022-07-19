import { c_style } from "./../../stylesConst";

export const UIstyles = {
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

  shadow: {
    borderWidth: 2,
    //  borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    //  shadowOffset: { width: 0, height: 4 },
    //  shadowOpacity: 0.8,
    //  shadowRadius: 10,
  },
};
