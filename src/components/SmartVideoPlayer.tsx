'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { throttle } from 'lodash';
import Toast from './ui/Toast';

interface SmartVideoPlayerProps {
  videoUrl: string;
  title?: string;
  sessionId?: string;
  accountId?: string;
  accessToken?: string;
  sessionStartTime?: string | null;
  sessionStatus?: string | null;
  sessionExecutionTime?: string | null;
}

// Utility: Determines if user is within 1-hour window of sessionStartTime
const isWithinOneHourWindow = (startHHMM?: string | null): { active: boolean; until?: string } => {
  if (!startHHMM) return { active: false };

  const [h, m] = startHHMM.split(':').map(Number);
  const now = new Date();
  const sessionStart = new Date(now);
  sessionStart.setHours(h, m, 0, 0);

  const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);
  const isActive = now >= sessionStart && now < sessionEnd;

  const until = sessionEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return { active: isActive, until };
};

const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
  videoUrl,
  sessionId,
  accountId,
  accessToken,
  sessionStartTime,
}) => {
  const playerRef = useRef<ReactPlayer>(null);

  const [progress, setProgress] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);

  // Compute "overdue" for messaging, but STILL send completion to backend.
  const [sessionOverdue, setSessionOverdue] = useState(false);
  const [videoDeadlineMessage, setVideoDeadlineMessage] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type?: 'error' | 'success' | 'info';
  } | null>(null);

  const storageKey = `watched_session_${accountId}_${sessionId}`;
  const progressKey = `watched_progress_${accountId}_${sessionId}`;

  const [watchedState, setWatchedState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(storageKey) === 'true';
  });

  // Refs to avoid stale closures inside throttled handlers
  const watchedRef = useRef(watchedState);
  const overdueRef = useRef(sessionOverdue);
  useEffect(() => {
    watchedRef.current = watchedState;
  }, [watchedState]);
  useEffect(() => {
    overdueRef.current = sessionOverdue;
  }, [sessionOverdue]);

  // In-flight lock to prevent duplicate calls
  const isMarkingWatched = useRef(false);

  // Evaluate session deadline and load saved progress on mount
  useEffect(() => {
    const { active, until } = isWithinOneHourWindow(sessionStartTime);
    if (!active) {
      setSessionOverdue(true);
      setVideoDeadlineMessage(
        "⏱ This session has expired. You had 1 hour to complete it. You can still watch the video; the backend will record it, but it won't count toward the leaderboard.",
      );
    } else {
      setVideoDeadlineMessage(
        `✅ You have until ${until} to complete this video. Completion will count toward the leaderboard.`,
      );
    }

    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      const parsed = parseFloat(savedProgress);
      if (!isNaN(parsed)) setProgress(parsed);
    }
  }, [sessionStartTime, progressKey]);

  // Handles setting watched state and persistence
  const setWatched = (val: boolean) => {
    setWatchedState(val);
    if (val) {
      localStorage.setItem(storageKey, 'true');
    } else {
      localStorage.removeItem(storageKey);
    }
  };

  const showToast = (
    title: string,
    message: string,
    type: 'error' | 'success' | 'info' = 'info',
  ) => {
    setToast({ title, message, type });
  };

  // Single guarded completion call (always notifies backend, even if overdue)
  const markAsWatched = async () => {
    // prevent duplicates while request is in-flight or if already marked
    if (watchedRef.current || isMarkingWatched.current) return;

    isMarkingWatched.current = true;
    try {
      const res = await fetch(
        `https://backend.scottmakesyoumove.com/api/v1/account/${accountId}/sessions/${sessionId}`,
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

        // If backend says session is already finished or otherwise not allowed, show on the FE.
        if (res.status === 409 && errorMsg.includes('Session is already finished')) {
          setSessionOverdue(true);
          showToast(
            'Session Finished',
            'Your completion was recorded, but it will not count toward the leaderboard.',
            'info',
          );
        } else {
          showToast('Failed to Save Progress', errorMsg, 'error');
        }
        return;
      }

      // Mark locally
      setWatched(true);

      // Interpret backend response to decide the message.
      // Flexible checks in case backend returns different shapes.
      const counts =
        data?.countsTowardLeaderboard ??
        (data?.sessionStatus ? data.sessionStatus !== 'OVERDUE' : undefined);

      if (counts === false) {
        showToast(
          'Video Completed',
          "Nice work! We've recorded your completion, but it won't count toward the leaderboard.",
          'info',
        );
      } else {
        showToast('Nice Work!', 'Video successfully marked as completed.', 'success');
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      showToast('Error', 'Something went wrong. Please try again later.', 'error');
    } finally {
      isMarkingWatched.current = false;
    }
  };

  // Throttled progress uses refs to avoid stale state; triggers single guarded call
  const throttledProgress = useRef(
    throttle((state: { played: number }) => {
      const playedPercent = state.played;
      setProgress(playedPercent);
      localStorage.setItem(progressKey, playedPercent.toFixed(4));

      if (playedPercent >= 0.9 && !watchedRef.current) {
        // even if overdue, we still notify backend; lock prevents duplicates
        markAsWatched();
      }
    }, 1000),
  ).current;

  return (
    <div className="space-y-6 mt-6 w-full" role="region" aria-labelledby="video-section-heading">
      <h2 id="video-section-heading" className="sr-only">
        Video player section
      </h2>

      {videoDeadlineMessage && (
        <div
          role="alert"
          className={`rounded-md px-4 py-3 text-sm ${
            sessionOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {videoDeadlineMessage}
        </div>
      )}

      {/* Visually hidden progress for screen readers */}
      <div className="sr-only" aria-live="polite">
        {Math.round(progress * 100)}% watched
      </div>

      {/* Video & Interaction Area */}
      {!watchedState && !manualOverride && (
        <div className="w-full flex flex-col-reverse md:flex-col items-end gap-4">
          <div className="relative group w-full md:w-auto">
            <button
              onClick={() => {
                setManualOverride(true);
                markAsWatched();
              }}
              disabled={progress < 0.9}
              className={`w-full md:w-auto px-6 py-3 text-base font-semibold rounded-lg transition shadow
                ${
                  progress < 0.9
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              ✅ Mark as Done
            </button>
            {progress < 0.9 && (
              <div
                className="absolute top-full mt-2 right-0 w-max bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg z-10 hidden group-hover:block whitespace-nowrap"
                role="tooltip"
              >
                Watch at least 90% to enable this
              </div>
            )}
          </div>

          <div className="w-full aspect-video relative">
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
            />
          </div>
        </div>
      )}

      {/* Completion State */}
      {(watchedState || sessionOverdue) && (
        <div
          className="flex flex-col items-center justify-center space-y-4"
          role="status"
          aria-live="polite"
        >
          {watchedState && (
            <>
              <div
                className="animate-bounce bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-2xl font-semibold"
                aria-label="Video completed and counted toward leaderboard"
              >
                🏅
              </div>
              <p className="text-lg text-gray-900 font-medium">
                Nice work on completing the video!
              </p>
            </>
          )}

          <a
            href="/leaderboard"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
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
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SmartVideoPlayer;
