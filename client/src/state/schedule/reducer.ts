import { getScheduleA, isLoadingA, SCHEDULE, ScheduleAction } from "./actions";
import { ScheduleGroupsStateT } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { scheduleApi } from "../../api/schedule";

export const initialState: ScheduleGroupsStateT = {
  group: "",
  days: [],
  isLoading: false,
};

export const scheduleReducer = (
  state: ScheduleGroupsStateT = initialState,
  action: ScheduleAction
) => {
  switch (action.type) {
    case SCHEDULE.GET:
      
      return { group: action.group, days: action.schedule };
    case SCHEDULE.LOADING:
      console.log(action.isLoading);
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export const getSchedule = (
  groupName: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      scheduleApi.getSchedule(groupName).then((res) => {
        dispatch(getScheduleA(groupName, res));
        resolve();
      });
    });
  };
};
