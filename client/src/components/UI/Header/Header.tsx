import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { Header } from "@rneui/themed";
import { styles } from "./styles";
import { Button } from "@rneui/base";
import { c_style } from "./../../../stylesConst";

interface HeaderMainI {
  title?: string;
  isNotActiveButton?: boolean;
}

export const HeaderMain: FC<HeaderMainI> = ({
  title = "My ATI",
  isNotActiveButton = false,
}) => {
  const [icon, setIcon] = useState<"menufold" | "menuunfold">("menuunfold");
  const managePanelActivity = () => {
    if (icon === "menuunfold") {
      setIcon("menufold");
    } else {
      setIcon("menuunfold");
    }
  };
  return (
    <Header
      backgroundColor={c_style.darkT.primary}
      backgroundImageStyle={{}}
      centerComponent={{
        text: title,
        style: styles.text,
      }}
      centerContainerStyle={styles.textContainer}
      containerStyle={styles.header}
      leftComponent={
        !isNotActiveButton
          ? {
              icon: icon,
              type: "antdesign",
              color: "#fff",
              size: 25,
              onPress: managePanelActivity,
              style: styles.button,
            }
          : undefined
      }
      leftContainerStyle={styles.buttonContainer}
      placement="left"
    />
  );
};
