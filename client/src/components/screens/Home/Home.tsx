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
import { getSchedule } from "../../../state/schedule/reducer";
import { AnyAction } from "redux";
import { HomeTabScreenProps } from "../../../navigation/types";
import { isLoadingA } from "./../../../state/schedule/actions";
import { Button } from "@rneui/base";
import { useGetScheduleQuery } from "../../../state/services/schedule";
import { setCurDay } from "../../../state/slices/settings/settingSlice";

export const Home = ({ route }: HomeTabScreenProps<"Home">) => {
  //   var groupSchedule = useAppSelector((state) => state.schedule);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetScheduleQuery(
    (route.params as any).group
  );

  return (
    <Layoult>
      <View>
        <HeaderMain />
      </View>
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
          />
        </View>
        <View style={styles.contentContainer}>
          {!isStart && !isLoading && data ? (
            <UltraView
              data={data}
              renderItem={(item, index) => (
                <DayCard lessons={item.lessons} dayOfWeek={item.dayOfWeek} />
              )}
              curPage={curPage}
              onSwipe={(count2) => {
                dispatch(setCurDay(count2 as any));
              }}
              onLayout={() => {}}
            />
          ) : (
            <Button
              size="lg"
              loadingProps={{ size: "large" }}
              loading
              type="clear"
              style={{ position: "absolute" }}
            />
          )}
        </View>
      </View>
    </Layoult>
  );
};
