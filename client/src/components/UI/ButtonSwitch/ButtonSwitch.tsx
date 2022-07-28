import { ListItemButtonGroup } from "@rneui/base/dist/ListItem/ListItem.ButtonGroup";
import React, { FC, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { useStyles } from "./../../../hooks/useStyles";

type buttonT = {
  items: { text: string; icon: string; typeIcon: string }[];
  customOnPress: (selectedIndex?: number) => void;
};
interface ButtonGroupI {
  buttons: buttonT;
  customStyle: StyleProp<ViewStyle>;
}

export const ButtonSwitch: FC<ButtonGroupI> = ({ buttons, customStyle }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
    buttons.customOnPress(selectedIndex);
  };
  const style = useStyles(styles);

  return (
    <View style={{ ...style.wrapper, ...(customStyle as StyleSheet) }}>
      <ListItemButtonGroup
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
