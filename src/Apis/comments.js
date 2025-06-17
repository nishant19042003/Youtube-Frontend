import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getComments: builder.mutation({
      query: (id) => ({
        url: `comment/${id}`,
        method: 'GET',
      }),
    }),
    addComment: builder.mutation({
      query: ({ videoid, content }) => ({
        url: `comment/${videoid}`,
        method: 'POST',
        body: { content },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comment/c/${id}`,
        method: 'DELETE',
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `comment/c/${id}`,
        method: 'PATCH',
        body: { content },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});
export const { useGetCommentsMutation, useAddCommentMutation, useDeleteCommentMutation,useUpdateCommentMutation } = commentsApi;
export default commentsApi;