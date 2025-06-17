// components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

import { useGetUserProfileQuery } from '../Apis/userApi.js';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setUserData } from '../Store/userSlice.js';

function Layout() {
  
  const { data: userProfile } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(userProfile){
      
      dispatch(setUserData(userProfile.data));
      
    }
  },[dispatch,userProfile])
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
     
      {/* Main content area */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet /> {/* This renders the nested route's component */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
