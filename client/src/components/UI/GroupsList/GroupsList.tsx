import { View, Text } from "react-native";
import React, { FC } from "react";
import { GroupCardMini } from "../GroupCardMini/GroupCardMini";
import { useStyles } from "./../../../hooks/useStyles";
import { UIstyles } from "./../UIstyles";
import { useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../../../hooks/redux";
import { Button, Icon } from "@rneui/base";
import { StackActions, useNavigation } from "@react-navigation/native";

interface GroupsListI {
  onPressNav: () => void;
  style: any;
}
export const GroupsList: FC<GroupsListI> = ({ style, onPressNav }) => {
  const navigation = useNavigation();
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
          {groups.map((group, i) => (
            <GroupCardMini
              name={group.name}
              onClickNav={onPressNav}
              isMain={group.isMain}
              withBtnClose
              key={"gc" + i}
            />
          ))}
        </>
      )}
      <Button
        containerStyle={{
          ...UIstyles().shadow,
          backgroundColor: theme.colors.grey0,
          marginTop: 15,
          margin: 0,
          flexDirection: "column",

          overflow: "hidden",
          borderRadius: 15,
          borderColor: "black",
          borderWidth: 0,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.grey0,
          //  justifyContent: "space-between",
        }}
        onPress={() => {
          onPressNav();

          const resetAction = StackActions.replace("Groups");
          navigation.dispatch(resetAction);
        }}
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
            Все группы
          </Text>
          <Icon
            name="magnifying-glass"
            type="entypo"
            size={30}
            color={theme.colors.black}
          />
        </View>
      </Button>
    </View>
  );
};

export const GroupsListMin: FC<GroupsListI> = ({ style, onPressNav }) => {
  const groups = useAppSelector((state) => state.group.groups);
  const stylesUI = useStyles(UIstyles);

  return (
    <View style={style}>
      {groups.length !== 0 && (
        <>
          <Text style={{ ...stylesUI.h2_p, textAlign: "center" }}>
            Ничего, у вас есть загруженная группа:
          </Text>
          {groups.map((group, i) => {
            if (group.isMain)
              return (
                <GroupCardMini
                  name={group.name}
                  onClickNav={onPressNav}
                  isMain={group.isMain}
                  key={"gcm" + i}
                />
              );
          })}
        </>
      )}
    </View>
  );
};
