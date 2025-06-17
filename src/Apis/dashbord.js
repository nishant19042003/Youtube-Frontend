import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.mutation({
      query: (id) => ({
        url: `dashbord/stats/${id}`,
        method: 'GET',
      }),
    }),
    getVideos: builder.mutation({
      query: (id) => ({
        url: `dashbord/videos/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetDashboardDataMutation,useGetVideosMutation } = dashboardApi;