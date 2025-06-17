import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  videos: [],
  loading: false,
  error: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeVideos: (state, action) => {
      state.videos = [];
      state.loading = false;
      state.error = null;
    },
  },
});
export const { setVideos, setLoading, setError,removeVideos } = videoSlice.actions;
export default videoSlice.reducer;