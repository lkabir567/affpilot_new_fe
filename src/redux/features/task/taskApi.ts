import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // feature 1: get all features-list
    getAllFeatures: builder.query({
      query: () => "/task/v1/feature-list",
    }),
  }),
});

export const { useGetAllFeaturesQuery } = taskApi;
