import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ScheduleGroupsStateT } from "./types";

const initialState: ScheduleGroupsStateT = {
  group: "",
  days: [],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = scheduleSlice.actions;

export default scheduleSlice.reducer;
