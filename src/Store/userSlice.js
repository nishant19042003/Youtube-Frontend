import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userdata: null, // This will hold user data after login or registration
  authStatus: false, // This will track if the user is authenticated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userdata = action.payload;
      state.authStatus = true; // Set authStatus to true when user data is set
    },
    clearUserData: (state) => {
      state.userdata = null;
      state.authStatus = false; // Reset authStatus when user data is cleared
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
