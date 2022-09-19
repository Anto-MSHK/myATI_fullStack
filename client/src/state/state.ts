import { Store, combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { appReducer } from "./app/reducer";
import { AppStateT } from "./app/types";
import { appSettingsReducer } from "./appSettings/reducer";
import { AppSettingsStateT } from "./appSettings/types";
import { scheduleReducer } from "./schedule/reducer";
import { ScheduleGroupsStateT } from "./schedule/types";
import thunk from "redux-thunk";
export interface RootState {
  schedule: ScheduleGroupsStateT;
  app: AppStateT;
  appSettings: AppSettingsStateT;
}

const rootReducer = combineReducers<RootState>({
  schedule: scheduleReducer,
  app: appReducer,
  appSettings: appSettingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export default store;
