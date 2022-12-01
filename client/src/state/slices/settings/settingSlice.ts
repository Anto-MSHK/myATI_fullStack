import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppSettingsStateI } from "./types";

const initialState: AppSettingsStateI = {
  theme: "dark",
  curDay: 0,
  curWeek: "topWeek",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setCurDay: (state, action: PayloadAction<0 | 1 | 2 | 3 | 4 | 5>) => {
      state.curDay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, setCurDay } = settingsSlice.actions;

export default settingsSlice.reducer;
