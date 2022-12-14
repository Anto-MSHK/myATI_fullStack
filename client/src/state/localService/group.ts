import AsyncStorage from "@react-native-async-storage/async-storage";
import { DayT, GroupListT } from "../slices/group/types";

export const saveGroups = async (value: GroupListT[]) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("@myGroups_Key", jsonValue);
};

export const saveSchedule = async (value: DayT[]) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(
    "@timeSchedule_Key",
    JSON.stringify(`${new Date().getDate()}.${new Date().getMonth()}`)
  ).then();
  await AsyncStorage.setItem("@mySchedule_Key", jsonValue).then();
};
