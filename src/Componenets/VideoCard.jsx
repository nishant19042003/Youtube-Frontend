import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
    console.log(video, 'Video Data in VideoCard');
  return (
    <div className="w-72 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Thumbnail */}
      <Link to={`/video/${video._id}/${video.owner[0]._id}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover"
        />
      </Link>

      {/* Owner Info */}
      <Link to={`/channel/${video.owner[0]._id}`}>
      <div className="flex items-center gap-3 p-3">
        
          <img
            src={video.owner[0].avatar}
            alt={video.owner[0].username}
            className="w-10 h-10 rounded-full object-cover"
            />
            <div>
            <p className="font-semibold text-sm">{video.owner[0].username}</p>
            <p className="text-xs text-gray-500">{video.owner[0].title}</p>
            </div>
       
      </div>
       </Link>
    </div>
  );
};

export default VideoCard;
