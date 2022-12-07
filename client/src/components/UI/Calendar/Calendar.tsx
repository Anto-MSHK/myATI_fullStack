import { View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Icon, Text } from "@rneui/base";
import { c_style } from "./../../../stylesConst";
import { UIstyles } from "./../../UI/UIstyles";
import { styles } from "./styles";
import { useStyles } from "./../../../hooks/useStyles";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useDispatch } from "react-redux";
import { setCurDay } from "../../../state/slices/settings/settingSlice";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@rneui/themed";

const BtnCalendar =
  (value: number, weekDay: string, isDate: boolean = false): FC =>
  () => {
    const { theme } = useTheme();
    return (
      <View
        style={[
          styles().buttonContentContainer,
          isDate
            ? {
                borderColor: theme.colors.white,
                borderWidth: 3,
                width: 38,
                height: 37,
                borderRadius: 50,
                justifyContent: "center",
              }
            : {},
        ]}
      >
        <Text style={styles().secondaryContentText}>{weekDay}</Text>
        <Text style={styles().mainContentText}>{value ? value : ""}</Text>
      </View>
    );
  };

interface CalendarI {
  onChangeDay: (day: number) => void;
  weekDates: string[];
  posX: SharedValue<number>;
  opacity: SharedValue<number>;
}

export const Calendar: FC<CalendarI> = ({
  onChangeDay,
  weekDates,
  posX,
  opacity,
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
  const curDate = useAppSelector((state) => state.settings.curDate);
  const buttons = [
    {
      element: BtnCalendar(
        +week[0],
        "пн",
        curDate === weekDates[0] ? true : false
      ),
    },
    {
      element: BtnCalendar(
        +week[1],
        "вт",
        curDate === weekDates[1] ? true : false
      ),
    },
    {
      element: BtnCalendar(
        +week[2],
        "ср",
        curDate === weekDates[2] ? true : false
      ),
    },
    {
      element: BtnCalendar(
        +week[3],
        "чт",
        curDate === weekDates[3] ? true : false
      ),
    },
    {
      element: BtnCalendar(
        +week[4],
        "пт",
        curDate === weekDates[4] ? true : false
      ),
    },
    {
      element: BtnCalendar(
        +week[5],
        "сб",
        curDate === weekDates[5] ? true : false
      ),
    },
  ];
  const { theme } = useTheme();
  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const curDay = useAppSelector((state) => state.settings.curDay);
  const switchWeek = useAppSelector((state) => state.settings.switchWeek);

  const [selectedIndex, setSelectedIndex] = useState(curDay);
  const dispatch = useAppDispatch();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: posX.value }],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => {
    let x = posX.value / 0.8;
    if (posX.value > 0) {
      if (x >= 90) x = 90;
    } else if (posX.value < 0) {
      if (x <= -90) x = -90;
    }
    return {
      transform: [{ translateX: -x }],
    };
  });
  const opTextLeftStyle = useAnimatedStyle(() => {
    let op = 0;
    if (posX.value > 0) {
      let procent = (Math.abs(posX.value) * 100) / 90;
      op = procent / 100;
    }
    return {
      opacity: op,
    };
  });

  const opTextRightStyle = useAnimatedStyle(() => {
    let op = 0;
    if (posX.value < 0) {
      let procent = (Math.abs(posX.value) * 100) / 90;
      op = procent / 100;
    }
    return {
      opacity: op,
    };
  });

  return (
    <View
      onLayout={() => {
        onChangeDay(curDay);
      }}
    >
      <Card containerStyle={style.calendarContainer}>
        <Animated.View style={animatedStyle}>
          <ButtonGroup
            buttons={buttons}
            selectedIndex={curDay}
            onPress={(value) => {
              dispatch(setCurDay(value));
              onChangeDay(value);
              setSelectedIndex(value);
            }}
            containerStyle={[
              style.buttonsContainer,
              { backgroundColor: theme.colors.grey0 },
            ]}
            selectedButtonStyle={style.selectedButton}
            buttonContainerStyle={style.buttonContainer}
          />
        </Animated.View>
        <Animated.View
          style={[
            textStyle,
            {
              position: "absolute",
              alignSelf: "center",
              zIndex: -1,
              elevation: 0,
              flexDirection: "row",
              //   width: 105,
            },
          ]}
        >
          <Animated.View style={[{ right: 40 }, opTextLeftStyle]}>
            <Text
              style={{
                color: theme.colors.black,
                top: 15,
                position: "absolute",
                fontSize: 11,
                textAlign: "left",
              }}
            >
              {"предыдущая\nнеделя"}
            </Text>
            <Icon
              name="arrowleft"
              type="antdesign"
              color={theme.colors.black}
              size={22}
              containerStyle={{ position: "absolute", left: 40, top: 25 }}
            />
          </Animated.View>
          <Animated.View style={[{ left: 40 }, opTextRightStyle]}>
            <Text
              style={{
                color: theme.colors.black,
                top: 15,

                fontSize: 11,
                textAlign: "right",
              }}
            >
              {"следующая\nнеделя"}
            </Text>
            <Icon
              name="arrowright"
              type="antdesign"
              color={theme.colors.black}
              size={22}
              containerStyle={{ position: "absolute", right: 40, top: 25 }}
            />
          </Animated.View>
        </Animated.View>
        <View style={style.infoContainer}>
          <Text style={{ textAlign: "center", ...UIstyles().h3_p }}>
            {curMounts.length === 2
              ? curMounts[0] + "-" + curMounts[1]
              : curMounts[0]}
            ,
            <Text style={styleUI.h3}>
              {switchWeek === "topWeek" ? " верхняя неделя" : " нижняя неделя"}
            </Text>
          </Text>
        </View>
      </Card>
    </View>
  );
};
