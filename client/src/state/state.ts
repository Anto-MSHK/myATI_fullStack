import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { groupAPI } from "./services/group";
import groupSlice from "./slices/group/groupSlice";
import settingsSlice from "./slices/settings/settingSlice";

export const store = configureStore({
  reducer: {
    [groupAPI.reducerPath]: groupAPI.reducer,
    group: groupSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([groupAPI.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
