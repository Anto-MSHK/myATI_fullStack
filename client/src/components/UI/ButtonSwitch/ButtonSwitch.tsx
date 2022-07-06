import { ListItemButtonGroup } from "@rneui/base/dist/ListItem/ListItem.ButtonGroup";
import React, { FC, useState } from "react";
import { c_style } from "./../../../stylesConst";
import { View } from "react-native";

interface ButtonGroupI {
  children: any;
}

export const ButtonSwitch: FC<ButtonGroupI> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={{ marginHorizontal: -15 }}>
      <ListItemButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={children}
        containerStyle={{
          backgroundColor: c_style.darkT.secondary,
          borderWidth: 0,
          borderRadius: 0,
          top: -15,
          //   marginHorizontal: -15,
          justifyContent: "center",
          height: 35,
          borderBottomWidth: 1,
          width: "100%",
        }}
        selectedButtonStyle={{ backgroundColor: c_style.darkT.dominant }}
        innerBorderStyle={{ width: 0 }}
      />
    </View>
  );
};
