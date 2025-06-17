import React, {  useEffect } from 'react'


import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserProfileQuery } from '../Apis/userApi';
import { useState } from 'react';
import LogoutButton from '../Componenets/LogoutButton';
import VideoCard from '../Componenets/VideoCard';
import VideoFrame from '../Componenets/VideoFrame';
import { useNavigate } from 'react-router-dom';
//channel video and dashboard data
import {useGetDashboardDataMutation} from '../Apis/dashbord';
import { useGetVideosMutation } from '../Apis/dashbord';

function ChannelProfile() {
  const {id}=useParams();
  const { data: userProfile, isLoading: isUserProfileLoading, error: userProfileError } = useGetUserProfileQuery(id);
  const navigate = useNavigate();
  const tabs = ['videos', 'profile' ,'logout','playlists','upload'];
  const [tab, setTab] = useState('videos');
  //dashboard and video data
  const [getdashboard, { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError }] = useGetDashboardDataMutation();
  const [getvideos, { data: videos, isLoading: isVideosLoading, error: videosError }] = useGetVideosMutation();
   
  

  useEffect(() => {
      const getdetails=async() => {
        try {
          await getdashboard(id);
          await getvideos(id);  
        } catch (error) {
          console.error('Error fetching dashboard or videos:', error);  
        }
      };
      getdetails();
  }, [id, getdashboard, getvideos]);

  
  if(isUserProfileLoading || isDashboardLoading || isVideosLoading||videosError||dashboardError||userProfileError
    || !userProfile?.data || !dashboardData?.data || !videos?.data || videos.data.length === 0  
  ) {
    
    return <div>Loading...</div>; 
  }
  
  return (
  <div className="w-full">
      {/* Cover Image */}
      <div className="w-full h-48 bg-gray-200">
        <img src={userProfile.data.coverimage} alt="Cover" className="w-full h-full object-cover" />
      </div>
      {/* Channel Info */}
      <div className="flex items-center gap-4 p-4">
        <img
          src={userProfile.data.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white -mt-12"
        />
        <div>
          <h1 className="text-2xl font-bold">{userProfile.data.username}</h1>
          <div className="text-sm text-gray-600">
            {dashboardData.data?.totalsubscriber[0]?.subscriberCount} Subscribers • {dashboardData.data?.totalVideoLike[0]?.totalLikes} Likes
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-red-600 text-white px-4 py-2 rounded">Subscribe</button>
        </div>
        <LogoutButton/>

      </div>
      {/* Tabs */}
      <div className="border-b px-4">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              //className={`py-2 px-4 ${tab === 'videos' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
         {/* Content */}
      <div className="p-4">
        {tab === 'videos' && (
          <div onClick={() => setTab('videos')} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.data.map((video) => (
              <VideoCard key={video._id} video={video} />
              
            ))}
          </div>
        )}
        {tab === 'profile' && (
          <div onClick={() => setTab('profile')} className="bg-gray-100 p-4 rounded">

            <h2 className="text-xl font-semibold">Profile Information</h2>
            <p><strong>Username:</strong> {userProfile.data.username}</p>
            <p><strong>Email:</strong> {userProfile.data.email}</p>
            {/* Add more profile fields as needed */}
          </div>
        )}
        {tab === 'playlists' && (
          <div onClick={() => setTab('playlists')} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold">Playlists</h2>
            {/* Add playlist content here */}
          </div>
        )}
        {tab === 'logout' && (
          <div onClick={() => setTab('logout')} className="bg-red-100 p-4 rounded">
            <h2 className="text-xl font-semibold">Logout</h2>
            <p>Are you sure you want to logout?</p>
            <LogoutButton />
          </div>
        )}
        {tab === 'upload' && (
          <div onClick={() => setTab('upload')} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold">Upload Video</h2>
            <button onClick={() => navigate('/upload')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Upload Video
            </button>
            
            {/* Add upload video form or content here */}
          </div>
        )}
      </div>
      
    </div>
    
  );
}

export default  ChannelProfile;
