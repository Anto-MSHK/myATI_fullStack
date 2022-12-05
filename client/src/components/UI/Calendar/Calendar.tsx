import { View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Text } from "@rneui/base";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../../UI/UIstyles";
import { styles } from "./styles";
import { useStyles } from "./../../../hooks/useStyles";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useDispatch } from "react-redux";
import { setCurDay } from "../../../state/slices/settings/settingSlice";
import Animated from "react-native-reanimated";

const BtnCalendar =
  (value: number, weekDay: string): FC =>
  () => {
    return (
      <View style={styles().buttonContentContainer}>
        <Text style={styles().secondaryContentText}>{weekDay}</Text>
        <Text style={styles().mainContentText}>{value ? value : ""}</Text>
      </View>
    );
  };

interface CalendarI {
  onChangeDay: (day: number) => void;
  weekDates: string[];
  animStyle: any;
}

export const Calendar: FC<CalendarI> = ({
  onChangeDay,
  weekDates,
  animStyle,
}) => {
  const mountsNames = {
    "01": "январь",
    "02": "февраль",
    "03": "март",
    "04": "апрель",
    "05": "май",
    "06": "июнь",
    "07": "июль",
    "08": "август",
    "09": "сентябрь",
    "10": "октябрь",
    "11": "ноябрь",
    "12": "декабрь",
  };
  const curMounts: string[] = [];
  weekDates.map((day) => {
    if (
      curMounts.findIndex(
        (el) => el === mountsNames[day.split("/")[0] as any]
      ) === -1
    )
      curMounts.push(mountsNames[day.split("/")[0] as any]);
  });
  const week = weekDates.map((day) => day.split("/")[1]);
  const buttons = [
    {
      element: BtnCalendar(+week[0], "пн"),
    },
    {
      element: BtnCalendar(+week[1], "вт"),
    },
    {
      element: BtnCalendar(+week[2], "ср"),
    },
    {
      element: BtnCalendar(+week[3], "чт"),
    },
    {
      element: BtnCalendar(+week[4], "пт"),
    },
    {
      element: BtnCalendar(+week[5], "сб"),
    },
  ];
  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const curDay = useAppSelector((state) => state.settings.curDay);
  const curWeek = useAppSelector((state) => state.settings.curWeek);

  const [selectedIndex, setSelectedIndex] = useState(curDay);
  const dispatch = useAppDispatch();

  return (
    <View
      onLayout={() => {
        onChangeDay(curDay);
      }}
    >
      <Card containerStyle={style.calendarContainer}>
        <Animated.View style={animStyle}>
          <ButtonGroup
            buttons={buttons}
            selectedIndex={curDay}
            onPress={(value) => {
              dispatch(setCurDay(value));
              onChangeDay(value);
              setSelectedIndex(value);
            }}
            containerStyle={style.buttonsContainer}
            selectedButtonStyle={style.selectedButton}
            buttonContainerStyle={style.buttonContainer}
          />
        </Animated.View>
        <View style={style.infoContainer}>
          <Text style={{ textAlign: "center", ...UIstyles().h3_p }}>
            {curMounts.length === 2
              ? curMounts[0] + "-" + curMounts[1]
              : curMounts[0]}
            ,
            <Text style={styleUI.h3}>
              {curWeek === "topWeek" ? " верхняя неделя" : " нижняя неделя"}
            </Text>
          </Text>
        </View>
      </Card>
    </View>
  );
};
