'use client';

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { throttle } from 'lodash';
import Toast from './ui/Toast';

interface SmartVideoPlayerProps {
  videoUrl: string;
  title?: string;
  sessionId?: string;
  accountId?: string;
  accessToken?: string;
}

const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
  videoUrl,
  title,
  sessionId,
  accountId,
  accessToken,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [progress, setProgress] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const [sessionOverdue, setSessionOverdue] = useState(false);

  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type?: 'error' | 'success' | 'info';
  } | null>(null);

  // Utility: scoped key for localStorage
  const getStorageKey = (accountId?: string, sessionId?: string) =>
    `watched_session_${accountId}_${sessionId}`;

  // Load watched state from localStorage
  const [watchedState, setWatchedState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(getStorageKey(accountId, sessionId)) === 'true';
  });

  // Custom setter that updates both state and localStorage
  const setWatched = (val: boolean) => {
    setWatchedState(val);
    const key = getStorageKey(accountId, sessionId);
    if (val) {
      localStorage.setItem(key, 'true');
    } else {
      localStorage.removeItem(key);
    }
  };

  // Toast handlers
  const showToast = (
    title: string,
    message: string,
    type: 'error' | 'success' | 'info' = 'info',
  ) => {
    setToast({ title, message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const markAsWatched = async () => {
    if (watchedState || sessionOverdue) return;

    try {
      const res = await fetch(
        `https://smym-backend-service.azurewebsites.net/api/v1/account/${accountId}/sessions/${sessionId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data?.message || 'An error occurred while marking the video as watched.';

        if (res.status === 409 && errorMsg.includes('Session is already finished')) {
          setSessionOverdue(true);
          showToast('Session Expired', 'This session is no longer available to complete.', 'info');
        } else {
          showToast('Failed to Save Progress', errorMsg, 'error');
        }

        return;
      }

      setWatched(true);
      showToast('Nice Work!', 'Video successfully marked as completed.', 'success');
    } catch (err: any) {
      console.error('Unexpected error:', err);
      showToast('Error', 'Something went wrong. Please try again later.', 'error');
    }
  };

  const handleManualClick = () => {
    setManualOverride(true);
    markAsWatched();
  };

  const throttledProgress = useRef(
    throttle((state: { played: number }) => {
      setProgress(state.played);
      if (state.played >= 0.9 && !watchedState && !sessionOverdue) {
        markAsWatched();
      }
    }, 1000),
  ).current;

  return (
    <div className="space-y-6 mt-6 w-full" role="region" aria-labelledby="video-section-heading">
      <h2 id="video-section-heading" className="sr-only">
        Video player section
      </h2>

      {!watchedState && !manualOverride && !sessionOverdue && (
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

      {(watchedState || sessionOverdue) && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center space-y-4"
        >
          {watchedState && !sessionOverdue && (
            <>
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
            </>
          )}

          {sessionOverdue && (
            <p className="text-red-600 text-sm font-medium text-center">
              This session has expired. You had 1 hour to complete it.
            </p>
          )}

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

      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};
export default SmartVideoPlayer;
