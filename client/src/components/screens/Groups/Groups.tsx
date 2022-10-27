import {
  SegmentedControlIOSComponent,
  StyleSheet,
  Text,
  View,
  ScrollView,
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
import store from "../../../state/state";
import { AnyAction } from "redux";
import { GroupCard } from "./../../UI/GroupCard/GroupCard";
import { getGroups } from "./../../../state/group/reducer";
import { HomeTabScreenProps } from "../../../navigation/types";

export const Groups = ({ navigation }: HomeTabScreenProps<"Groups">) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups() as any);
  }, []);

  var groups = useAppSelector((state) => state.groups);

  return (
    <Layoult>
      <View>
        <HeaderMain />
      </View>
      <ScrollView style={styles.contentContainer}>
        {groups.map((group) => (
          <GroupCard
            onClickNav={(group: string) => {
              navigation.navigate("Home", { group: group });
            }}
            name={group.name}
            faculty={group.faculty}
          />
        ))}
      </ScrollView>
    </Layoult>
  );
};
