import {
  SegmentedControlIOSComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React, { useState } from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { UltraView } from "../../UI/UltraView/UltraView";
import { useDispatch } from "react-redux";
import { setCurDayA } from "../../../state/app/actions";

export const Home = () => {
  var days = useAppSelector((state) => state.schedule[0].days);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const dispatch = useDispatch();
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
        {!isStart && (
          <UltraView
            data={days}
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
