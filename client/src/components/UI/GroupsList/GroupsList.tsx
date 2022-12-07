import { View, Text } from "react-native";
import React, { FC } from "react";
import { GroupCardMini } from "../GroupCardMini/GroupCardMini";
import { useStyles } from "./../../../hooks/useStyles";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

interface GroupsListI {
  style: any;
}
export const GroupsList: FC<GroupsListI> = ({ style }) => {
  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();
  return (
    <View style={style}>
      <Text
        style={{ ...styleUI.h3_p, color: theme.colors.black, marginTop: 20 }}
      >
        Важные группы:
      </Text>
      <GroupCardMini name="ВИС-21" faculty="FVO" onClickNav={() => {}} />
    </View>
  );
};
