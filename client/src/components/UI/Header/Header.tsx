import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Header, useThemeMode, useTheme } from "@rneui/themed";
import { styles } from "./styles";
import { UIstyles } from "./../UIstyles";
import { useStyles } from "./../../../hooks/useStyles";
import { useDispatch } from "react-redux";
import { setAppSettingsA } from "../../../state/appSettings/actions";
import { useAppSelector } from "../../../hooks/redux";

interface HeaderMainI {
  title?: string;
  isNotActiveButton?: boolean;
}

export const HeaderMain: FC<HeaderMainI> = ({
  title = "My ATI",
  isNotActiveButton = false,
}) => {
  const dispatch = useDispatch();
  var themeMode = useAppSelector((state) => state.appSettings.theme);

  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const [icon, setIcon] = useState<"menufold" | "menuunfold">("menuunfold");

  //   useEffect(() => {
  //     setMode(themeMode);
  //   }, []);

  const managePanelActivity = () => {
    if (icon === "menuunfold") {
      setIcon("menufold");
      setMode("light");
    } else {
      setIcon("menuunfold");
      setMode("dark");
    }
    //  dispatch(setAppSettingsA(mode));
  };

  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  return (
    <Header
      backgroundColor={theme.colors.background}
      backgroundImageStyle={{}}
      centerComponent={{
        text: title,
        style: styleUI.h0,
      }}
      centerContainerStyle={style.textContainer}
      containerStyle={style.header}
      leftComponent={
        !isNotActiveButton
          ? {
              icon: icon,
              type: "antdesign",
              color: theme.colors.black,
              size: 25,
              onPress: managePanelActivity,
              style: style.button,
            }
          : undefined
      }
      leftContainerStyle={style.buttonContainer}
      placement="left"
    />
  );
};
