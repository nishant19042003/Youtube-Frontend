import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const SubscriptionApi=createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: (channelId) => ({
                url: `subscription/${channelId}`,
                method: 'GET',
            }),
        }),
        Togglesubscription: builder.mutation({
            query: ( channelId ) => ({
                url: `subscription/${channelId}`,
                method: 'POST',
            }),
        }),
    }),
});
export const { useGetSubscriptionQuery, useTogglesubscriptionMutation } = SubscriptionApi;
export default SubscriptionApi;