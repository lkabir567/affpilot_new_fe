import { ENV } from "@/lib/dot.env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.SERVER_URL,
    //   prepareHeaders: (headers, { getState }) => {
    //     const token = getState()?.auth?.accessToken;
    //     if (token) {
    //       headers.set("authorization", `Bearer ${token}`);
    //     }
    //     return headers;
    //   },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
