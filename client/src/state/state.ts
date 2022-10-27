import { Store, combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { appSettingsReducer } from "./appSettings/reducer";
import { AppSettingsStateT } from "./appSettings/types";
import { scheduleReducer } from "./schedule/reducer";
import { ScheduleGroupsStateT } from "./schedule/types";
import thunk from "redux-thunk";
import { groupReducer } from "./group/reducer";
import { GroupsStateT } from "./group/types";
import { AppStateT } from "./app/types";
import { appReducer } from "./app/reducer";
export interface RootState {
  schedule: ScheduleGroupsStateT;
  groups: GroupsStateT;
  appSettings: AppSettingsStateT;
  app: AppStateT;
}

const rootReducer = combineReducers<RootState>({
  schedule: scheduleReducer,
  groups: groupReducer,
  appSettings: appSettingsReducer,
  app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export default store;
