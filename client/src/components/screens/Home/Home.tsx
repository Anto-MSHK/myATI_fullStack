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
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { UltraView } from "../../UI/UltraView/UltraView";
import { useDispatch } from "react-redux";
import { getSchedule } from "../../../state/schedule/reducer";
import store from "../../../state/state";
import { AnyAction } from "redux";
import { setCurDayA } from "../../../state/app/actions";
import { HomeTabScreenProps } from "../../../navigation/types";

export const Home = ({ route }: HomeTabScreenProps<"Home">) => {
  var groupSchedule = useAppSelector((state) => state.schedule);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchedule((route.params as any).group) as any);
  }, []);

  return (
    <Layoult>
      <View>
        <HeaderMain />
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
      </View>
      <View style={styles.contentContainer}>
        {!isStart && groupSchedule.group !== "" && (
          <UltraView
            data={groupSchedule.days}
            renderItem={(item, index) => (
              <DayCard lessons={item.lessons} dayOfWeek={item.dayOfWeek} />
            )}
            curPage={curPage}
            onSwipe={(count2) => {
              dispatch(setCurDayA(count2));
            }}
          />
        )}
      </View>
    </Layoult>
  );
};
