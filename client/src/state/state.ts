import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { groupAPI } from "./services/group";
import { scheduleAPI } from "./services/schedule";
import groupSlice from "./slices/group/groupSlice";
import settingsSlice from "./slices/settings/settingSlice";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    [groupAPI.reducerPath]: groupAPI.reducer,
    [scheduleAPI.reducerPath]: scheduleAPI.reducer,
    group: groupSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([groupAPI.middleware, scheduleAPI.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
