import authReducer from "@/redux/slices/auth.slice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { apiReducers } from "../api";
import storage from "./storage";
const PERSIST_CONFIG_KEY = "affpilot";

export const reducers = combineReducers({
  auth: authReducer,
  ...apiReducers,
});

export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  whitelist: ["auth"],
  storage,
};

export const persistedReducer = persistReducer(persistConfig, reducers);
