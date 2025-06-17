import React, { use, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../Store/userSlice';
import { removeVideos } from '../Store/videoSlice';
import { useLogoutUserMutation } from '../Apis/userApi';
function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = useCallback(() => {
    // Clear token or user data from localStorage
    localStorage.removeItem('token'); // or any other key you use
     
    // Optional: clear all local storage
    // localStorage.clear();
    // Clear user data from Redux store
    
    dispatch(clearUserData());
    dispatch(removeVideos());
    // Call the logout API
    logoutUser().then((response) => {
      if (response.error) {
        console.error("Logout failed:", response.error);
      } else {
        console.log("Logout successful");
      }
    });
    // Optional: Show message (you can also use toast)
    
    alert("You have been logged out.");

    // Redirect to login page
    navigate('/');
  }, [navigate, dispatch, logoutUser]);

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
