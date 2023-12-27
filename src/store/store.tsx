import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: { home: homeSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
