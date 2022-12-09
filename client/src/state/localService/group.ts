import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupListT } from "../slices/group/types";
import { DayT } from "../slices/schedule/types";

export const saveGroups = async (value: GroupListT[]) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("@myGroups_Key", jsonValue);
};

export const saveSchedule = async (value: DayT[]) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("@mySchedule_Key", jsonValue).then();
};
