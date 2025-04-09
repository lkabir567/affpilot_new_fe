// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { apiMiddleware } from "./api";
import { persistedReducer } from "./utils/store-configuration";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiMiddleware),
});

export default store;

export const persistor = persistStore(store);
