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
import { Button, Icon } from "@rneui/base";
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
  withDecay,
  withSpring,
} from "react-native-reanimated";
import { BottomList, ButtonCloseList } from "../../UI/BottomList/BottomList";
import {
  deleteGroup,
  deleteSchedule,
  getScheduleByStorage,
  setGroup,
} from "../../../state/slices/group/groupSlice";
import { StackActions } from "@react-navigation/native";
import { saveSchedule } from "../../../state/localService/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStyles } from "../../../hooks/useStyles";
import { UIstyles } from "../../UI/UIstyles";
import { Loading } from "./../../UI/Loading/Loading";

export const Home = ({ route, navigation }: HomeTabScreenProps<"Home">) => {
  const groups = useAppSelector((state) => state.group.groups);
  useEffect(() => {
    const gr = groups.find((cand) => cand.isMain);
    if (gr) {
      if (route.params.group === "") {
        navigation.popToTop();
        navigation.replace("Home", { group: gr.name });
      }
    } else if (route.params.group === "") {
      navigation.navigate("Groups");
    }
  }, [groups]);

  let curStatus = useAppSelector((state) => state.settings.curStatus);
  let today = useAppSelector((state) => state.settings.curDate);
  let curIndexDay = useAppSelector((state) => state.settings.curDay);

  const [curPage, setCurPage] = useState({ value: 0, isChange: false });
  const [isStart, setIsStart] = useState(true);
  const dispatch = useAppDispatch();
  const positionX = useSharedValue(0);
  const opacitySwipe = useSharedValue(1);

  const [groupCur, setGroupCur] = useState(route.params.group);
  const [fastLoading, setFastLoading] = useState(false);
  useEffect(() => {
    setFastLoading(true);
    setGroupCur((route.params as any).group);
    const a = groups.find((cand) => cand.isMain === true);
    if ((route.params as any).group === a?.name) {
      dispatch(getScheduleByStorage());
    } else {
      dispatch(deleteSchedule());
    }
  }, [(route.params as any).group]);

  const { data, error, isLoading } = useGetScheduleQuery(
    (route.params as any).group
  );

  useEffect(() => {
    setFastLoading(false);
  }, [data]);

  const stylesUI = useStyles(UIstyles);

  const weekDates = useAppSelector((state) => state.settings.weekDates);
  const dataLocal = useAppSelector((state) => state.group.scheduleMainGroup);
  const [revWeekDates, setRevWeekDates] = useState<string[]>(weekDates);
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
    return weekDays;
  };
  const list = [
    {
      color: "white",
      containerStyle: {
        backgroundColor: theme.colors.grey5,
      },
      children: (
        <View style={{ flex: 1 }} key={"text-1"}>
          <Icon
            name={dataLocal.length > 0 ? "archive" : "cloud"}
            type="entypo"
            size={20}
            color={theme.colors.grey2}
            containerStyle={{ marginBottom: -10, marginTop: 10 }}
          />
          <Text
            style={{
              marginHorizontal: 10,
              borderRadius: 20,
              flex: 1,
              marginTop: 5,
              textAlign: "center",
              ...stylesUI.h3_b,
              color: theme.colors.grey2,
            }}
          >
            {dataLocal.length > 0 ? "Загружено с телефона" : "Последняя версия"}
          </Text>
        </View>
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
            // marginTop: 10,
          }}
          color={theme.colors.grey4}
          onPress={() => {
            if (groups.findIndex((cand) => cand.name === groupCur) === -1)
              dispatch(setGroup({ name: groupCur }));
            else dispatch(deleteGroup(groupCur));
          }}
          key={"btn-1"}
        >
          {groups.findIndex((cand) => {
            return cand.name === groupCur;
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
            marginBottom: 5,
            marginTop: 10,
            flex: 1,
          }}
          buttonStyle={{}}
          color={theme.colors.primary}
          onPress={() => {
            dispatch(setGroup({ name: groupCur, isMain: true }));
            data && saveSchedule(data);
          }}
          disabled={
            groups.findIndex(
              (cand) => cand.name === groupCur && cand.isMain
            ) === -1
              ? false
              : true
          }
          key={"btn-2"}
        >
          {groups.findIndex((cand) => cand.name === groupCur && cand.isMain) ===
          -1
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

  const opacityTodayBtn = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(false);

  const onUnhideBtn = (curDay: number, a: string[] | undefined = undefined) => {
    if (a && a[curDay]) {
      console.log(a[curDay] + "=+=" + today);
      if (a[curDay] !== today) opacityTodayBtn.value = withSpring(1);
      else opacityTodayBtn.value = withSpring(0);
    } else {
      console.log(revWeekDates[curDay] + "=-=" + today);
      if (revWeekDates[curDay] !== today) opacityTodayBtn.value = withSpring(1);
      else opacityTodayBtn.value = withSpring(0);
    }
  };

  const opacityTodayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityTodayBtn.value,
    };
  });

  const onToggle = () => {
    setIsVisible((prev) => !prev);
    if (!isVisible) {
      posBtnOpen.value = withSpring(-(curSize * list.length - list.length));
      posModal.value = withSpring(0, {
        damping: 12,
      });
      opacityBG.value = withSpring(1);
      heightBG.value = withSpring(1000);
      colorBtn.value = withSpring(1);
      opacityIconOpen.value = withSpring(0);
      opacityIconClose.value = withSpring(100);
    } else {
      posBtnOpen.value = withSpring(0);
      posModal.value = withSpring(curSize * list.length - list.length, {
        damping: 12,
      });
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
        <HeaderMain title={groupCur} />
      </View>

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
      <Animated.View
        style={[
          opacityTodayStyle,
          {
            position: "absolute",
            bottom: 25,
            left: 85,
            zIndex: 5,
          },
        ]}
      >
        <Button
          containerStyle={{
            borderRadius: 50,
          }}
          color={theme.colors.primary}
          onPress={() => {
            let indexDay = 0;
            if (revWeekDates.findIndex((cand) => today === cand) !== -1)
              indexDay = revWeekDates.findIndex((cand) => today === cand);
            else indexDay = weekDates.findIndex((cand) => today === cand);
            setCurPage((prev) => {
              return {
                ...prev,
                value: indexDay,
                noChange: !prev.isChange,
              };
            });
            dispatch(setCurDay(indexDay as any));
            setRevWeekDates(weekDates);
            onUnhideBtn(indexDay, weekDates);
            dispatch(setCurWeek());
          }}
        >
          <Text style={{ paddingBottom: 2, ...stylesUI.h3 }}>сегодня</Text>
          <Icon
            name={"arrowleft"}
            type={"antdesign"}
            size={20}
            color={theme.colors.black}
          />
        </Button>
      </Animated.View>
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
              onUnhideBtn(day);
            }}
            posX={positionX}
            opacity={opacitySwipe}
            weekDates={revWeekDates.length === 0 ? weekDates : revWeekDates}
          />
        </View>
        <View style={styles.contentContainer}>
          {!fastLoading &&
            !isStart &&
            ((data && !isLoading) || dataLocal.length > 0) && (
              <UltraView
                data={
                  dataLocal.length !== 0
                    ? dataLocal
                    : data && !isLoading
                    ? data
                    : []
                }
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
                onSwipe={(count) => {
                  dispatch(setCurDay(count as any));
                  onUnhideBtn(count);
                }}
                onSwipeHorz={(operation, count) => {
                  const a = operWeek(operation);
                  dispatch(setWeek());
                  onUnhideBtn(count, a);
                }}
                onLayout={() => {}}
              />
            )}
          <Loading />
        </View>
      </View>
    </Layoult>
  );
};
