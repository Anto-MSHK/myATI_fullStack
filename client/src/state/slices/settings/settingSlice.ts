import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppSettingsStateI } from "./types";

const initialState: AppSettingsStateI = {
  theme: "dark",
  curDay: 0,
  curWeek: "topWeek",
  curDate: "",
  weekDates: [],
  curStatus: "Сейчас пар нет.",
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
    setCurStatus: (state, action: PayloadAction<string>) => {
      state.curStatus = action.payload;
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
      console.log(state.curDate);
      console.log(weekDays);
      console.log(state.curDay);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, setCurDay, setCurDayAndWeek, setCurStatus } =
  settingsSlice.actions;

export default settingsSlice.reducer;
