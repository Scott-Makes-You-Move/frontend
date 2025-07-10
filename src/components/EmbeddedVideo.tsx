'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface EmbeddedVideoProps {
  videoUrl: string;
  title?: string;
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({ videoUrl, title }) => {
  return (
    <div className="w-full h-full aspect-video rounded-lg overflow-hidden shadow-md">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        title={title}
        className="react-player"
      />
    </div>
  );
};

export default EmbeddedVideo;
