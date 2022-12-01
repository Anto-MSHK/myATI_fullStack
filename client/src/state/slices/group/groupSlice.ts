import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GroupsStateI } from "./types";

const initialState: GroupsStateI = {
  groups: [],
  isLoading: false,
};

export const counterSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
