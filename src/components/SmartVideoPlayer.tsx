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
    if (watched) return;

    setWatched(true);
    // TODO: Use PUT endpoint on POSTMAN to send sessionId to backend.
    try {
      await fetch('/api/video-watched', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }), //
      });
      console.log('✅ Video marked as watched');
    } catch (err) {
      console.error('Failed to mark as watched:', err);
      setWatched(false);
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
    }, 1000),
  ).current;

  return (
    <div className="space-y-6 mt-6 w-full" role="region" aria-labelledby="video-section-heading">
      <h2 id="video-section-heading" className="sr-only">
        Video player section
      </h2>

      {!watched && !manualOverride && (
        <div className="w-full flex flex-col-reverse md:flex-col items-end gap-4">
          <div className="relative group w-full md:w-auto">
            <button
              onClick={handleManualClick}
              disabled={progress < 0.9}
              className={`w-full md:w-auto px-6 py-3 text-base font-semibold rounded-lg transition shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${
                  progress < 0.9
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              aria-disabled={progress < 0.9}
              aria-label={
                progress < 0.9
                  ? 'Mark as done button disabled until video is 90% watched'
                  : 'Mark video as done'
              }
            >
              ✅ Mark as Done
            </button>
            {progress < 0.9 && (
              <div
                role="tooltip"
                id="mark-as-done-tooltip"
                className="absolute top-full mt-2 right-0 w-max bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg z-10 hidden group-hover:block whitespace-nowrap"
              >
                Watch at least 90% to enable this
              </div>
            )}
          </div>

          <div className="w-full aspect-video relative" aria-label="Video player">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls
              width="100%"
              height="100%"
              onProgress={throttledProgress}
              onEnded={markAsWatched}
              className="absolute top-0 left-0"
              config={{
                youtube: { playerVars: { title: 1 } },
                vimeo: { title: '1' },
              }}
              aria-label={`Exercise video titled ${title}`}
            />
          </div>
        </div>
      )}

      {watched && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div
            className="transform -translate-x-1/2 mt-2 animate-bounce bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-2xl font-semibold"
            tabIndex={0}
            aria-label="Video completed. Great job!"
          >
            🏅
          </div>
          <p className="text-lg text-gray-900 font-medium" aria-live="polite">
            Nice work on completing the video!
          </p>
          <a
            href="/leaderboard"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            role="button"
            aria-label="View your leaderboard ranking"
          >
            View Leaderboard
          </a>
        </div>
      )}
    </div>
  );
};

export default SmartVideoPlayer;
