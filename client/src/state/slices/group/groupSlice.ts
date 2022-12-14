import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  DayT,
  GroupListStateI,
  GroupListT,
  GroupMinT,
  GroupsStateI,
} from "./types";
import { saveGroups, saveSchedule } from "../../localService/group";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: GroupListStateI = {
  groups: [],
  scheduleMainGroup: [],
  timeReload: "",
};

export const saveGroupsToStorage = createAsyncThunk(
  "group/saveGroupsToStorage",
  async (groups: GroupListT[]) => {
    await saveGroups(groups);
  }
);

export const getGroupsByStorage = createAsyncThunk(
  "group/getGroupsByStorage",
  async () => {
    const value = await AsyncStorage.getItem("@myGroups_Key");
    if (value !== null) {
      let arrGroups: GroupListT[] = JSON.parse(value);
      return arrGroups;
    } else {
      return [];
    }
  }
);

export const getScheduleByStorage = createAsyncThunk(
  "group/getScheduleByStorage",
  async () => {
    const value = await AsyncStorage.getItem("@mySchedule_Key");
    const valueTime = await AsyncStorage.getItem("@timeSchedule_Key");
    if (value !== null) {
      let data: DayT[] = JSON.parse(value);
      if (valueTime !== null) {
        let time: string = JSON.parse(valueTime);
        return { data, time };
      }
      return { data };
    } else {
      return {};
    }
  }
);

export const counterSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<GroupListT>) => {
      let indexMain = state.groups.findIndex(
        (cand) => cand.isMain === action.payload.isMain
      );
      let indexCur = state.groups.findIndex(
        (cand) => cand.name === action.payload.name
      );

      if (indexMain === -1) {
        if (indexCur === -1) state.groups = [...state.groups, action.payload];
        else
          state.groups[indexCur] = {
            name: action.payload.name,
            isMain: action.payload.isMain,
          };
      } else {
        state.groups[indexMain].isMain = undefined;
        if (indexCur === -1) state.groups = [...state.groups, action.payload];
        else
          state.groups[indexCur] = {
            name: action.payload.name,
            isMain: action.payload.isMain,
          };
      }

      saveGroups(state.groups);
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (cand) => cand.name !== action.payload
      );
      saveGroups(state.groups);
    },
    deleteSchedule: (state) => {
      state.scheduleMainGroup = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveGroupsToStorage.fulfilled, (state, action) => {});
    builder.addCase(getGroupsByStorage.fulfilled, (state, action) => {
      state.groups = action.payload;
    });
    builder.addCase(getScheduleByStorage.fulfilled, (state, action) => {
      if (action.payload.data) state.scheduleMainGroup = action.payload.data;
      if (action.payload.time) state.timeReload = action.payload.time;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setGroup, deleteGroup, deleteSchedule } = counterSlice.actions;

export default counterSlice.reducer;
