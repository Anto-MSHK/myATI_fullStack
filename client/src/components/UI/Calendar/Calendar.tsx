import { View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Text } from "@rneui/base";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../../UI/UIstyles";
import { styles } from "./styles";
import { useStyles } from "./../../../hooks/useStyles";
import { useAppSelector } from "../../../hooks/redux";
import { useDispatch } from "react-redux";
import { setCurDayA } from "../../../state/app/actions";

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

interface CalendarI {
  onChangeDay: (day: number) => void;
}

export const Calendar: FC<CalendarI> = ({ onChangeDay }) => {
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
  ];
  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const curDay = useAppSelector((state) => state.app.curDay);
  const [selectedIndex, setSelectedIndex] = useState(curDay);
  const dispatch = useDispatch();

  return (
    <View
      onLayout={() => {
        onChangeDay(curDay);
      }}
    >
      <Card containerStyle={style.calendarContainer}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={curDay}
          onPress={(value) => {
            dispatch(setCurDayA(value));
            onChangeDay(value);
            setSelectedIndex(value);
          }}
          containerStyle={style.buttonsContainer}
          selectedButtonStyle={style.selectedButton}
          buttonContainerStyle={style.buttonContainer}
        />
        <View style={style.infoContainer}>
          <Text style={{ textAlign: "center", ...UIstyles().h3_p }}>
            Июль,
            <Text style={styleUI.h3}>{" нижняя неделя"}</Text>
          </Text>
        </View>
      </Card>
    </View>
  );
};
