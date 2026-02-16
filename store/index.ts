import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clubsReducer from "./slices/clubsSlice";
import ridesReducer from "./slices/ridesSlice";
import marketplaceReducer from "./slices/marketplaceSlice";
import feedReducer from "./slices/feedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    clubs: clubsReducer,
    rides: ridesReducer,
    marketplace: marketplaceReducer,
    feed: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export feature hooks, selectors, and thunks
export * from "./features";
