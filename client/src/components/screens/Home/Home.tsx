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
  withSpring,
} from "react-native-reanimated";
import { BottomList, ButtonCloseList } from "../../UI/BottomList/BottomList";
import { deleteGroup, setGroup } from "../../../state/slices/group/groupSlice";

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
  const groups = useAppSelector((state) => state.group.groups);
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
      weekDays.push(
        new Date(
          curDate.getTime() + addCount * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", { timeZone: "Europe/Moscow" })
      );
    }
    setRevWeekDates(weekDays);
  };
  const list = [
    {
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
      },
      children: (
        <Button
          containerStyle={{ marginHorizontal: 10, borderRadius: 20, flex: 1 }}
          color={theme.colors.grey4}
          onPress={() => {
            if (
              groups.findIndex((cand) => cand.name === route.params.group) ===
              -1
            )
              dispatch(setGroup({ name: (route.params as any).group }));
            else dispatch(deleteGroup(route.params.group));
          }}
        >
          {groups.findIndex((cand) => {
            return cand.name === route.params.group;
          }) === -1
            ? "Добавить в список групп"
            : "Удалить из списка групп"}
        </Button>
      ),
    },
    {
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
      },
      children: (
        <Button
          containerStyle={{
            marginHorizontal: 10,
            borderRadius: 20,
            flex: 1,
          }}
          buttonStyle={{}}
          color={theme.colors.primary}
          onPress={() => {
            dispatch(
              setGroup({ name: (route.params as any).group, isMain: true })
            );
          }}
          disabled={
            groups.findIndex(
              (cand) => cand.name === route.params.group && cand.isMain
            ) === -1
              ? false
              : true
          }
        >
          {groups.findIndex(
            (cand) => cand.name === route.params.group && cand.isMain
          ) === -1
            ? "Сделать моей группой"
            : "Это моя группа"}
        </Button>
      ),
    },
  ];

  const curSize = 63;

  const posModal = useSharedValue(curSize * list.length - list.length);
  const opacityBG = useSharedValue(0);
  const heightBG = useSharedValue(-300);

  const posBtnOpen = useSharedValue(0);
  const colorBtn = useSharedValue(0);

  const opacityIconOpen = useSharedValue(100);
  const opacityIconClose = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(false);

  const onToggle = () => {
    setIsVisible((prev) => !prev);
    if (!isVisible) {
      posBtnOpen.value = withSpring(-(curSize * list.length - list.length));
      posModal.value = withSpring(0);
      opacityBG.value = withSpring(1);
      heightBG.value = withSpring(1000);
      colorBtn.value = withSpring(1);
      opacityIconOpen.value = withSpring(0);
      opacityIconClose.value = withSpring(100);
    } else {
      posBtnOpen.value = withSpring(0);
      posModal.value = withSpring(curSize * list.length - list.length);
      opacityBG.value = withSpring(0);
      heightBG.value = withSpring(-300);
      colorBtn.value = withSpring(0);
      opacityIconOpen.value = withSpring(100);
      opacityIconClose.value = withSpring(0);
    }
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
            zIndex: 2,
            elevation: 2,
            color: theme.colors.black,
            paddingVertical: 2,
            fontSize: 13,
          }}
        >
          {curStatus}
        </Text>
      )}
      <ButtonCloseList
        posBtnOpen={posBtnOpen}
        iconName={"profile"}
        onToggle={onToggle}
        colorBtn={colorBtn}
        visible={isVisible}
        opacityIconOpen={opacityIconOpen}
        opacityIconClose={opacityIconClose}
      />
      <BottomList
        visible={isVisible}
        list={list}
        heightScreen={heightBG}
        posModal={posModal}
        onToggle={onToggle}
        opacityBackground={opacityBG}
      />
      <View>
        <View
          style={{ zIndex: 2, elevation: 2 }}
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
