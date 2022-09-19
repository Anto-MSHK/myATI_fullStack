import { getScheduleA, SCHEDULE, ScheduleAction } from "./actions";
import { ScheduleGroupsStateT } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { scheduleApi } from "../../api/schedule";

export const initialState: ScheduleGroupsStateT = [];

export const scheduleReducer = (
  state: ScheduleGroupsStateT = initialState,
  action: ScheduleAction
) => {
  switch (action.type) {
    case SCHEDULE.GET:
      // console.log(action.schedule);
      action.schedule.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      return [...state, { group: "ВИС 11", days: action.schedule }];

    // define rest of actions here
    default:
      return state;
  }
};

export const getSchedule1 = (
  groupName: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    //  return new Promise<void>(async (resolve) => {
    return new Promise<void>((resolve) => {
      scheduleApi.getSchedule(groupName).then((res) => {
        dispatch(getScheduleA(res));
        resolve();
      });
    });
    //  resolve();
    //  });
  };
};
