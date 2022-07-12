import { ListItemButtonGroup } from "@rneui/base/dist/ListItem/ListItem.ButtonGroup";
import React, { FC, useState } from "react";
import { c_style } from "./../../../stylesConst";
import { View } from "react-native";
import { Icon, Text } from "@rneui/base";
import { UIstyles } from "../UIstyles";
import { styles } from "./styles";

type buttonT = {
  text: string;
  icon: string;
  typeIcon: string;
};
interface ButtonGroupI {
  buttons: buttonT[];
}

export const ButtonSwitch: FC<ButtonGroupI> = ({ buttons, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={styles.wrapper}>
      <ListItemButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons.map((button) => (
          <View style={styles.containerContent}>
            <Text style={styles.text}>{button.text}</Text>
            <Icon
              name={button.icon} //"caretup"
              type={button.typeIcon} //"antdesign"
              size={15}
              color="white"
              style={{ marginRight: 8 }}
            />
          </View>
        ))}
        containerStyle={styles.container}
        selectedButtonStyle={{ backgroundColor: c_style.darkT.dominant }}
        innerBorderStyle={{ width: 0 }}
      />
    </View>
  );
};
