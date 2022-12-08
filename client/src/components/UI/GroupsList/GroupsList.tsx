import { View, Text } from "react-native";
import React, { FC } from "react";
import { GroupCardMini } from "../GroupCardMini/GroupCardMini";
import { useStyles } from "./../../../hooks/useStyles";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../../../hooks/redux";

interface GroupsListI {
  style: any;
}
export const GroupsList: FC<GroupsListI> = ({ style }) => {
  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();
  const groups = useAppSelector((state) => state.group.groups);
  return (
    <View style={style}>
      {groups.length !== 0 && (
        <>
          <Text
            style={{
              ...styleUI.h3_p,
              color: theme.colors.black,
              marginTop: 20,
            }}
          >
            Важные группы:
          </Text>
          {groups.map((group) => (
            <GroupCardMini
              name={group.name}
              onClickNav={() => {}}
              isMain={group.isMain}
            />
          ))}
        </>
      )}
    </View>
  );
};
