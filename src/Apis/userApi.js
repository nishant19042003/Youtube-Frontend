// src/services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
    /*prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },*/
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users/register',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    refreshaccesstoken:builder.mutation({
      query: () => ({
        url: 'users/refresh-accesstoken"',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: 'users/profile',
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: 'users/profile',
        method: 'PUT',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    
  })
});

export const { useLoginUserMutation,useLogoutUserMutation,useRegisterUserMutation,useGetUserProfileQuery } = userApi;

