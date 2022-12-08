import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupListT } from "../slices/group/types";
import { DayT } from "../slices/schedule/types";

export const saveGroups = (value: GroupListT[]) => {
  const jsonValue = JSON.stringify(value);
  AsyncStorage.setItem("@myGroups_Key", jsonValue).then();
};

export const saveSchedule = (value: DayT[]) => {
  const jsonValue = JSON.stringify(value);
  AsyncStorage.setItem("@mySchedule_Key", jsonValue).then();
};
