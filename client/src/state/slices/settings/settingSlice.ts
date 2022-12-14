import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppSettingsStateI } from "./types";
import { dataApi } from "../../../api/data";

const initialState: AppSettingsStateI = {
  theme: "dark",
  curDay: 0,
  curWeek: "topWeek",
  switchWeek: "topWeek",
  curDate: "",
  weekDates: [],
  curStatus: [],
};

export const getWeek = createAsyncThunk(
  "group/saveGroupsToStorage",
  async () => {
    return await dataApi.getWeek();
  }
);

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
    setCurStatus: (state, action: PayloadAction<string[]>) => {
      state.curStatus = action.payload;
    },
    setWeek: (state) => {
      if (state.switchWeek === "topWeek") state.switchWeek = "lowerWeek";
      else state.switchWeek = "topWeek";
    },
    setCurWeek: (state) => {
      state.switchWeek = state.curWeek;
    },
    setCurDayAndWeek: (state) => {
      const curDate = new Date(
        new Date().toLocaleDateString("en-US", { timeZone: "Europe/Moscow" })
      );

      state.curDate = curDate.toLocaleDateString("en-US", {
        timeZone: "Europe/Moscow",
      });

      const weekDays: any[] = [];
      for (let i = 1; i <= 7; i++) {
        weekDays.push(
          new Date(
            curDate.setDate(curDate.getDate() - curDate.getDay() + i)
          ).toLocaleDateString("en-US", { timeZone: "Europe/Moscow" })
        );
      }

      weekDays.map((day, i) => {
        if (day === state.curDate) state.curDay = i as any;
      });
      state.weekDates = weekDays;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeek.fulfilled, (state, action) => {
      state.curWeek = action.payload;
      state.switchWeek = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setTheme,
  setCurDay,
  setCurDayAndWeek,
  setCurStatus,
  setWeek,
  setCurWeek,
} = settingsSlice.actions;

export default settingsSlice.reducer;
