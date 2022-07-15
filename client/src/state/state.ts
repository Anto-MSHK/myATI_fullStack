import { Store, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import { scheduleReducer } from "./schedule/reducer";
import { ScheduleGroupsStateT } from "./schedule/types";

export interface RootState {
  schedule: ScheduleGroupsStateT;
}

const rootReducer = combineReducers<RootState>({
  schedule: scheduleReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;
