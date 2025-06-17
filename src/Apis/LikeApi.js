import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const LikeApi= createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    ToggleLike: builder.mutation({
      query: (id) => ({
        url: `like/v/${id}`,
        method: 'POST',
        }),
    }),
    videolikeinfo: builder.query({
      query: (id) => ({
        url: `like/v/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const { useToggleLikeMutation,useVideolikeinfoQuery } = LikeApi;
export default LikeApi;