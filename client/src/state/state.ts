import { Store, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import { appSettingsReducer } from "./appSettings/reducer";
import { AppSettingsStateT } from "./appSettings/types";
import { scheduleReducer } from "./schedule/reducer";
import { ScheduleGroupsStateT } from "./schedule/types";

export interface RootState {
  schedule: ScheduleGroupsStateT;
  appSettings: AppSettingsStateT;
}

const rootReducer = combineReducers<RootState>({
  schedule: scheduleReducer,
  appSettings: appSettingsReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;
