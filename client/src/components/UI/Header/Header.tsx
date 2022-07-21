import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { Header, useThemeMode, useTheme } from "@rneui/themed";
import { styles } from "./styles";
import { Button } from "@rneui/base";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../UIstyles";

interface HeaderMainI {
  title?: string;
  isNotActiveButton?: boolean;
}

export const HeaderMain: FC<HeaderMainI> = ({
  title = "My ATI",
  isNotActiveButton = false,
}) => {
  const { theme } = useTheme();

  const { mode, setMode } = useThemeMode();
  const [icon, setIcon] = useState<"menufold" | "menuunfold">("menuunfold");
  const managePanelActivity = () => {
    if (icon === "menuunfold") {
      setIcon("menufold");
      setMode("dark");
    } else {
      setIcon("menuunfold");
      setMode("light");
    }
  };
  return (
    <Header
      backgroundColor={theme.colors.background}
      backgroundImageStyle={{}}
      centerComponent={{
        text: title,
        style: UIstyles().h0,
      }}
      centerContainerStyle={styles().textContainer}
      containerStyle={styles().header}
      leftComponent={
        !isNotActiveButton
          ? {
              icon: icon,
              type: "antdesign",
              color: theme.colors.black,
              size: 25,
              onPress: managePanelActivity,
              style: styles().button,
            }
          : undefined
      }
      leftContainerStyle={styles().buttonContainer}
      placement="left"
    />
  );
};
