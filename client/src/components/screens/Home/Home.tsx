import {
  SegmentedControlIOSComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React, { useEffect, useState } from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { UltraView } from "../../UI/UltraView/UltraView";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { HomeTabScreenProps } from "../../../navigation/types";
import { Button } from "@rneui/base";
import { useGetScheduleQuery } from "../../../state/services/schedule";
import {
  setCurDay,
  setCurDayAndWeek,
  setCurWeek,
  setWeek,
} from "../../../state/slices/settings/settingSlice";
import { useTheme } from "@rneui/themed";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export const Home = ({ route }: HomeTabScreenProps<"Home">) => {
  let curStatus = useAppSelector((state) => state.settings.curStatus);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const [isStart2, setIsStart2] = useState(true);
  const dispatch = useAppDispatch();
  const positionX = useSharedValue(0);
  const opacitySwipe = useSharedValue(1);

  const { data, error, isLoading } = useGetScheduleQuery(
    (route.params as any).group
  );

  const weekDates = useAppSelector((state) => state.settings.weekDates);
  const [revWeekDates, setRevWeekDates] = useState<string[]>([]);
  useEffect(() => {
    dispatch(setCurDayAndWeek());
    dispatch(setCurWeek());
  }, []);
  const { theme } = useTheme();

  const operWeek = (oper: number) => {
    let curDate;
    if (revWeekDates.length === 0) curDate = new Date(weekDates[0]);
    else curDate = new Date(revWeekDates[0]);

    //  state.curDate = curDate.toLocaleDateString("en-US", {
    //    timeZone: "Europe/Moscow",
    //  });

    const weekDays: any[] = [];
    for (let i = 0; i <= 6; i++) {
      let addCount = i + oper;
      console.log(
        new Date(
          curDate.getTime() + addCount * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { timeZone: "Europe/Moscow" })
      );
      weekDays.push(
        new Date(
          curDate.getTime() + addCount * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { timeZone: "Europe/Moscow" })
      );
    }
    console.log(weekDays);
    setRevWeekDates(weekDays);
  };
  return (
    <Layoult>
      <View>
        <HeaderMain title={route.params.group} />
      </View>
      {!isStart2 && (
        <Text
          style={{
            backgroundColor: theme.colors.grey5,
            textAlign: "center",
            zIndex: 10,
            elevation: 10,
            color: theme.colors.black,
            paddingVertical: 2,
            fontSize: 13,
          }}
        >
          {curStatus}
        </Text>
      )}
      <View>
        <View
          style={{ zIndex: 10, elevation: 10 }}
          onLayout={() => {
            setIsStart(false);
          }}
        >
          <Calendar
            onChangeDay={(day) => {
              setCurPage((prev) => {
                return { ...prev, value: day, noChange: !prev.isChange };
              });
            }}
            posX={positionX}
            opacity={opacitySwipe}
            weekDates={revWeekDates.length === 0 ? weekDates : revWeekDates}
          />
        </View>
        <View style={styles.contentContainer}>
          {!isLoading && !isStart && data && (
            <UltraView
              data={data}
              posX={positionX}
              opacity={opacitySwipe}
              renderItem={(item, index) => (
                <DayCard
                  lessons={item.lessons}
                  dayOfWeek={item.dayOfWeek}
                  dates={
                    revWeekDates.length === 0
                      ? weekDates[index]
                      : revWeekDates[index]
                  }
                />
              )}
              curPage={curPage}
              onSwipe={(count2) => {
                dispatch(setCurDay(count2 as any));
              }}
              onSwipeHorz={(operation) => {
                operWeek(operation);
                dispatch(setWeek());
              }}
              onLayout={() => {
                setIsStart2(false);
              }}
              style={isStart2 ? { opacity: 0, position: "absolute" } : {}}
            />
          )}
          <Button
            size="lg"
            loadingProps={{ size: "large" }}
            loading
            type="clear"
            style={{ position: "absolute" }}
          />
        </View>
      </View>
    </Layoult>
  );
};
