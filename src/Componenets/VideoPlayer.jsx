import React, { useState } from 'react';

const VideoPlayer = ({ url, title, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div style={{ maxWidth: '640px', margin: 'auto' }}>
      <h2>{title}</h2>
      {!isPlaying ? (
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <button
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ▶
          </button>
        </div>
      ) : (
        <video width="100%" controls autoPlay>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
