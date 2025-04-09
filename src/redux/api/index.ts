import { authApi } from "./auth.api";
import { taskApi } from "./task.api";

export * from "./auth.api";
export * from "./task.api";

export const apiMiddleware = [authApi.middleware, taskApi.middleware];

export const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
};
