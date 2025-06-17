import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import VideoUpload from '../Pages/VideoUpload';
export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints:(buildet)=>({
    getallVideos: buildet.query({
      query: () => ({
        url: 'video',
        method: 'GET',
      }),
    }),
    getVideoById: buildet.query({
      query: (id) => ({
        url: `video/${id}`,
        method: 'GET',
      }),
    }),
    VideoUpload: buildet.mutation({
      query: (formData) => ({
        url: 'video/',
        method: 'POST',
        body: formData,
        
      }),
    }),
  }),
  
})
export const { useGetallVideosQuery ,useGetVideoByIdQuery,useVideoUploadMutation} = videoApi;