import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { scheduleApi } from "../../api/schedule";
import { GroupsStateT } from "./types";
import { getGroupsA, GROUP, GroupAction } from "./actions";
import { groupApi } from "../../api/group";

export const initialState: GroupsStateT = [];

export const groupReducer = (
  state: GroupsStateT = initialState,
  action: GroupAction
) => {
  switch (action.type) {
    case GROUP.GET:
      return action.groups;
    default:
      return state;
  }
};

export const getGroups = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>((resolve) => {
      groupApi.getGroups().then((res) => {
        dispatch(getGroupsA(res));
        resolve();
      });
    });
  };
};
