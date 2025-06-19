import React from 'react'
import VideoFrame from '../Componenets/VideoFrame'
import { useGetVideoByIdQuery } from '../Apis/videoApi';
import { useParams } from 'react-router-dom'

function VideoUpdate() {
    const { id } = useParams();
    const { data: video, isLoading, error } = useGetVideoByIdQuery(id);
    if (isLoading||error ) {
        return <div>Loading...</div>;
    }
  return (
    <VideoFrame video={video} />
  )
}

export default VideoUpdate
