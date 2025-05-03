'use client';

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { throttle } from 'lodash';

interface SmartVideoPlayerProps {
  videoUrl: string;
  videoId: string;
  title?: string;
}

const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({ videoUrl, videoId, title }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [progress, setProgress] = useState(0);
  const [watched, setWatched] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  const markAsWatched = async () => {
    if (watched) return; // prevent duplicate posts

    setWatched(true); // optimistic lock
    try {
      await fetch('/api/video-watched', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      console.log('✅ Video marked as watched');
    } catch (err) {
      console.error('Failed to mark as watched:', err);
      setWatched(false); // allow retry if needed
    }
  };

  const handleManualClick = () => {
    setManualOverride(true);
    markAsWatched();
  };

  const throttledProgress = useRef(
    throttle((state: { played: number }) => {
      setProgress(state.played);
      if (state.played >= 0.9 && !watched) {
        markAsWatched();
      }
    }, 1000), // every 1 second
  ).current;

  return (
    <div className="space-y-4 mt-6 w-full">
      <div className="relative w-full aspect-video">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          onProgress={throttledProgress}
          onEnded={markAsWatched}
          className="absolute top-0 left-0"
        />
      </div>

      {!watched && !manualOverride && (
        <div className="flex justify-end">
          <button
            onClick={handleManualClick}
            disabled={progress < 0.9}
            className={`px-4 py-2 text-sm font-semibold rounded transition 
             ${
               progress < 0.9
                 ? 'bg-gray-400 cursor-not-allowed text-gray-100'
                 : 'bg-blue-600 hover:bg-blue-700 text-white'
             }`}
          >
            Mark as Done
          </button>
        </div>
      )}

      {watched && (
        <p className="text-green-600 text-sm font-medium">✅ Video marked as completed</p>
      )}
    </div>
  );
};

export default SmartVideoPlayer;
