import { StyleSheet, Text, View } from "react-native";
import { Layoult } from "../../UI/Layoult/Layoult";
import React, { useContext, useMemo, useRef, useState } from "react";
import { HeaderMain } from "../../UI/Header/Header";
import { DayCard } from "./../../UI/DayCard/DayCard";
import { useAppSelector } from "../../../hooks/redux";
import { Calendar } from "../../UI/Calendar/Calendar";
import { styles } from "./styles";
import { UltraView } from "../../UI/UltraView/UltraView";
import { useDispatch } from "react-redux";
import { setCurDayA } from "../../../state/app/actions";
import { setCurDayAT } from "../../../state/appSettings/actions";
import { shallowEqual } from "react-redux";
import { AppContext } from "../../../state/appContext";
import { useAppContext } from "./../../../state/appContext";

export const Home = () => {
  var days = useAppSelector((state) => state.schedule[0].days);

  const count = useRef(5);
  const [isStart, setIsStart] = useState(true);
  const dispatch = useDispatch();
  return (
    <Layoult>
      <View>
        <HeaderMain />
        <View
          onLayout={() => {
            setIsStart(false);
          }}
        >
          <Calendar
            onChangeDay={(day) => {
              count.current = day;
              console.log("dss" + count.current);
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
            defaultCur={count.current}
            onSwipe={(count2) => {
              dispatch(setCurDayA(count2));
            }}
          />
        )}
      </View>
    </Layoult>
  );
};
