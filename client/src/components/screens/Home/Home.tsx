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
} from "../../../state/slices/settings/settingSlice";
import { useTheme } from "@rneui/themed";

export const Home = ({ route }: HomeTabScreenProps<"Home">) => {
  let curStatus = useAppSelector((state) => state.settings.curStatus);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const [isStart2, setIsStart2] = useState(true);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetScheduleQuery(
    (route.params as any).group
  );
  useEffect(() => {
    dispatch(setCurDayAndWeek());
  }, []);
  const { theme } = useTheme();

  const weekDates = useAppSelector((state) => state.settings.weekDates);
  return (
    <Layoult>
      <View>
        <HeaderMain />
      </View>
      {!isStart2 && (
        <Text
          style={{
            backgroundColor: theme.colors.primary,
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
            weekDates={weekDates}
          />
        </View>
        <View style={styles.contentContainer}>
          {!isLoading && !isStart && data && (
            <UltraView
              data={data}
              renderItem={(item, index) => (
                <DayCard
                  lessons={item.lessons}
                  dayOfWeek={item.dayOfWeek}
                  dates={{
                    today: weekDates[index],
                    tommorow: weekDates[index + 1],
                  }}
                />
              )}
              curPage={curPage}
              onSwipe={(count2) => {
                dispatch(setCurDay(count2 as any));
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
