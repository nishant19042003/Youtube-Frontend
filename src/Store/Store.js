import { configureStore } from '@reduxjs/toolkit';
import  userSlice  from './userSlice.js';
import { userApi } from '../Apis/userApi.js';
import { videoApi } from '../Apis/videoApi.js';
import { dashboardApi } from '../Apis/dashbord.js';
import { commentsApi } from '../Apis/comments.js';
import LikeApi from '../Apis/LikeApi.js';
import SubscriptionApi from '../Apis/subscription.js';
export const store = configureStore({

  reducer: {
    user: userSlice,
    [videoApi.reducerPath]: videoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [commentsApi.reducerPath]:commentsApi.reducer,
    [LikeApi.reducerPath]: LikeApi.reducer,
    [SubscriptionApi.reducerPath]: SubscriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, videoApi.middleware, dashboardApi.middleware,
      commentsApi.middleware, LikeApi.middleware,SubscriptionApi.middleware),
    
});
 