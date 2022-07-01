import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { Header } from "@rneui/themed";
import { styles } from "./styles";
import { Button } from "@rneui/base";

interface HeaderMainI {}

export const HeaderMain: FC<HeaderMainI> = ({}) => {
  const [icon, setIcon] = useState<"menufold" | "menuunfold">("menuunfold");
  const openLeftPanel = () => {
    if (icon === "menuunfold") {
      setIcon("menufold");
    } else {
      setIcon("menuunfold");
    }
  };
  return (
    <Header
      backgroundColor="#222E3A"
      backgroundImageStyle={{}}
      barStyle="dark-content"
      centerComponent={{
        text: "Мой ATI",
        style: styles.text,
      }}
      centerContainerStyle={{
        justifyContent: "center",
      }}
      containerStyle={styles.header}
      leftComponent={{
        icon: icon,
        type: "antdesign",
        color: "#fff",
        size: 35,
        onPress: openLeftPanel,
        style: styles.button,
      }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      statusBarProps={{}}
    />
  );
};
