import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GroupListStateI, GroupListT, GroupMinT, GroupsStateI } from "./types";
import { saveGroups, saveSchedule } from "../../localService/group";

const initialState: GroupListStateI = {
  groups: [],
};

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
  },
});

// Action creators are generated for each case reducer function
export const { setGroup, deleteGroup } = counterSlice.actions;

export default counterSlice.reducer;
