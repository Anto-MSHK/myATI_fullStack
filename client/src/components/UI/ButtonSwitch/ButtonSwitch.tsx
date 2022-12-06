import { ListItemButtonGroup } from "@rneui/base/dist/ListItem/ListItem.ButtonGroup";
import React, { FC, useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ButtonGroup, Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { useStyles } from "./../../../hooks/useStyles";
import { useAppSelector } from "../../../hooks/redux";

type buttonT = {
  items: { text: string; icon: string; typeIcon: string }[];
  customOnPress: (selectedIndex?: number) => void;
};
interface ButtonGroupI {
  buttons: buttonT;
  customStyle: StyleProp<ViewStyle>;
}

export const ButtonSwitch: FC<ButtonGroupI> = ({ buttons, customStyle }) => {
  var week = useAppSelector((state) => state.settings.switchWeek);
  var l = 0;
  if (week === "topWeek") l = 0;
  else l = 1;

  const [selectedIndex, setSelectedIndex] = useState(l);

  useEffect(() => {
    buttons.customOnPress(selectedIndex);
  }, []);

  useEffect(() => {
    if (week === "topWeek") {
      setSelectedIndex(0);
      buttons.customOnPress(0);
    } else {
      setSelectedIndex(1);
      buttons.customOnPress(1);
    }
  }, [week]);

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
    buttons.customOnPress(selectedIndex);
  };
  const style = useStyles(styles);
  return (
    <View style={{ ...style.wrapper, ...(customStyle as StyleSheet) }}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons.items.map((button) => (
          <View style={style.containerContent}>
            <Text style={style.text}>{button.text}</Text>
            <Icon
              name={button.icon} //"caretup"
              type={button.typeIcon} //"antdesign"
              size={15}
              color="white"
              //   style={{ marginRight: 8 }}
            />
          </View>
        ))}
        containerStyle={style.container}
        selectedButtonStyle={style.selectedButton}
        innerBorderStyle={{ width: 0 }}
      />
    </View>
  );
};
