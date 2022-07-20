import { View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonGroup, Card, Text } from "@rneui/base";
import { c_style } from "./../../stylesConst";
import { UIstyles } from "./../UI/UIstyles";

const BtnCalendar =
  (value: number, weekDay: string): FC =>
  () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          style={{ marginBottom: -4, fontSize: 10, ...UIstyles.secondaryText }}
        >
          {weekDay}
        </Text>
        <Text style={{ fontSize: 14, ...UIstyles.secondaryText_b }}>
          {value}
        </Text>
      </View>
    );
  };

export const Calendar = () => {
  const buttons = [
    {
      element: BtnCalendar(10, "пн"),
    },
    {
      element: BtnCalendar(11, "вт"),
    },
    {
      element: BtnCalendar(12, "ср"),
    },
    {
      element: BtnCalendar(13, "чт"),
    },
    {
      element: BtnCalendar(14, "пт"),
    },
    {
      element: BtnCalendar(15, "сб"),
    },
    {
      element: BtnCalendar(16, "вс"),
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Card
      containerStyle={{
        padding: 0,
        margin: 0,
        borderBottomLeftRadius: 25,
        borderBottomEndRadius: 25,
        backgroundColor: c_style.darkT.secondary,
        //   borderWidth: 0,
        ...UIstyles.shadow,
        borderBottomWidth: 4,
      }}
    >
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{
          marginTop: 10,
          borderWidth: 0,
          backgroundColor: "rgba(0, 0, 0, 0)",
          height: 36,
        }}
        selectedButtonStyle={{
          backgroundColor: c_style.darkT.dominant,
        }}
        buttonContainerStyle={{
          backgroundColor: c_style.darkT.highlight,
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 5,
          borderColor: "rgba(0, 0, 0, 0)",
        }}
      />
      <Text
        style={{
          color: c_style.darkT.dominant,
          fontSize: 16,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Июль,
        <Text
          style={{
            color: c_style.darkT.color_p,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {" нижняя неделя"}
        </Text>
      </Text>
    </Card>
  );
};
