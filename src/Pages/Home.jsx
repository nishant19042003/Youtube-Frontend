import React, { useEffect, useState } from 'react';
import VideoPlayer from '../Componenets/VideoPlayer';
import { useGetallVideosQuery } from '../Apis/videoApi.js';
import { useSelector } from 'react-redux';
import VideoCard from '../Componenets/VideoCard.jsx';

function Home() {
  
  const user=useSelector((state) => state.user.authStatus);
  const { data: videos, isLoading, error } = useGetallVideosQuery();
  if(!user){
    return <>Please Login or register please</>
  }
  else{
      

      if (isLoading) {
        return <div>Loading videos...</div>;  
      }
      if (error) {
        return <div>Error loading videos: {error.message}</div>;
      }
      if(videos){return (

        <div>
          
          <h1>Welcome to the Video Library</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {videos.data.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      
      )};
  }
}

export default Home;
