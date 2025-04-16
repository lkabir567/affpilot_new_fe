// features/auth/redux/authApi.ts
import { ENV } from "@/lib/dot.env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.SERVER_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "accounts/v1/signin/",
        method: "POST",
        body: credentials,
        headers: { Accept: "*/*" },
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ access_token, referred_by }) => ({
        url: "/auth/google",
        method: "POST",
        body: { access_token, referred_by },
      }),
    }),
    checkAuth: builder.query({
      query: () => "/auth/verify",
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "accounts/v1/signup/",
        method: "POST",
        body: credentials,
        headers: { Accept: "*/*" },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/v1/forgot-password-request/",
        method: "POST",
        body: credentials,
        headers: { Accept: "*/*" },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/v1/reset-password-request/",
        method: "POST",
        body: credentials,
        headers: { Accept: "*/*" },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useCheckAuthQuery,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
