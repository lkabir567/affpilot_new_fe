import { ENV } from "@/lib/dot.env";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: ENV.SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    // console.log(token);
    if (token) {
      headers.set("Authorization", `token ${token}`);
    }
    return headers;
  },
});
