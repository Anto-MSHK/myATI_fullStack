import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React from "react";
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
  var curDay = useAppSelector((state) => state.app.curDay);
  const dispatch = useDispatch();
  return (
    <Layoult>
      <View>
        <HeaderMain />
        <Calendar />
      </View>
      <View style={styles.contentContainer}>
        <UltraView
          data={days}
          renderItem={(item, index) => (
            <DayCard lessons={item.lessons} dayOfWeek={item.dayOfWeek} />
          )}
          defaultCur={curDay}
          onSwipe={(curPage) => {
            dispatch(setCurDayA(curPage));
          }}
        />
      </View>
    </Layoult>
  );
};
