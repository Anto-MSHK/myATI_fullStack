import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { useStyles } from "./../../../hooks/useStyles";
import { useTheme, useThemeMode } from "@rneui/themed";
import { UIstyles } from "./../UIstyles";
import { Button, Card, Icon } from "@rneui/base";
import { styles } from "./styles";
import { useAppDispatch } from "../../../hooks/redux";

interface ChangeThemeI {
  style: any;
}

export const ChangeTheme: FC<ChangeThemeI> = ({ style }) => {
  const styleC = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const dispath = useAppDispatch();
  const { theme } = useTheme();
  const { setMode } = useThemeMode();
  const [icon, setIcon] = useState<"light-up" | "moon">("moon");
  return (
    <View style={style}>
      <Text
        style={{ ...styleUI.h3_p, color: theme.colors.black, marginTop: 20 }}
      >
        Тема (coming soon!):
      </Text>
      <Button
        containerStyle={styleC.cardContainer_all}
        buttonStyle={{
          backgroundColor: theme.colors.grey0,
          //  justifyContent: "space-between",
        }}
        disabledStyle={{ backgroundColor: theme.colors.grey2 }}
        onPress={() => {
          if (icon === "light-up") {
            setMode("dark");
            setIcon("moon");
          } else {
            setMode("light");
            setIcon("light-up");
          }
        }}
        disabled={true}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...styleUI.h1_b,
              color: theme.colors.black,
              marginRight: 10,
            }}
          >
            {icon === "moon" ? "Тёмная" : "Светлая"}
          </Text>
          <Icon
            name={icon}
            type="entypo"
            size={30}
            color={theme.colors.black}
          />
        </View>
      </Button>
    </View>
  );
};
