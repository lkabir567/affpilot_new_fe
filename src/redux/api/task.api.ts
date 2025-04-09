import { generateQueryString } from "@/utils/queryString/generateQueryString";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query-configurations";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getFeatureList: builder.query({
      query: (args = {}) => {
        const { queryString } = generateQueryString({ queryObject: args });

        return {
          url: `/task/v1/feature-list/${queryString}`,
          headers: {
            Accept: "*/*",
          },
        };
      },
    }),
    getMoreFeatureList: builder.query({
      query: (args) => {
        // console.log(args);
        const { queryString } = generateQueryString({
          queryObject: args,
        });
        return {
          url: `/task/v1/feature-list/${queryString}`,
        };
      },
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        try {
          const response = await queryFulfilled;
          const getMoreFeatureListApiResponse = response?.data;
          // console.log(getMoreNotificationsApiResponse);
          dispatch(
            taskApi.util.updateQueryData(
              "getFeatureList",
              undefined,
              (draft) => {
                // console.log("getNotification draft: ", draft?.results?.length);

                if (draft) {
                  draft.results = [
                    ...(draft.results ?? []),
                    ...(getMoreFeatureListApiResponse?.results ?? []),
                  ];
                  draft.count = getMoreFeatureListApiResponse?.count;
                  draft.total_pages =
                    getMoreFeatureListApiResponse?.total_pages;
                  draft.current_page =
                    getMoreFeatureListApiResponse?.current_page;
                  draft.links = {
                    next: getMoreFeatureListApiResponse?.links?.next,
                    previous: getMoreFeatureListApiResponse?.links?.previous,
                  };
                }
              }
            )
          );
        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),
  }),
});

export const { useGetFeatureListQuery, useGetMoreFeatureListQuery } = taskApi;
