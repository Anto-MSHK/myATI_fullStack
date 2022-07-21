import { View } from "react-native";
import React, { FC, useState } from "react";
import { Button, ButtonGroup, Card, Text } from "@rneui/base";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../../UI/UIstyles";
import { styles } from "./styles";

const BtnCalendar =
  (value: number, weekDay: string): FC =>
  () => {
    return (
      <View style={styles().buttonContentContainer}>
        <Text style={styles().secondaryContentText}>{weekDay}</Text>
        <Text style={styles().mainContentText}>{value}</Text>
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
    <Card containerStyle={styles().calendarContainer}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={styles().buttonsContainer}
        selectedButtonStyle={styles().selectedButton}
        buttonContainerStyle={styles().buttonContainer}
      />
      <View style={styles().infoContainer}>
        <Text style={{ textAlign: "center", ...UIstyles().h3_p }}>
          Июль,
          <Text style={UIstyles().h3}>{" нижняя неделя"}</Text>
        </Text>
      </View>
    </Card>
  );
};
