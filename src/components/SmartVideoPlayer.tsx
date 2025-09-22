'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Toast from './ui/Toast';

interface SmartVideoPlayerProps {
  videoUrl: string;
  title?: string;
  sessionId?: string;
  accountId?: string;
  accessToken?: string;
  sessionStartTime?: string | null;
  sessionStartDisplay?: string | null;
  sessionStatus?: string | null;
  sessionExecutionTime?: string | null;
}

const isWithinOneHourWindow = (startHHMM?: string | null): { active: boolean; until?: string } => {
  if (!startHHMM) return { active: false };

  const [h, m] = startHHMM.split(':').map(Number);
  const now = new Date();
  console.log('🚀 ~ isWithinOneHourWindow ~ now:', now);
  const sessionStart = new Date(now);
  console.log('🚀 ~ isWithinOneHourWindow ~ sessionStart:', sessionStart);
  sessionStart.setHours(h, m, 0, 0);

  const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);
  console.log('🚀 ~ isWithinOneHourWindow ~ sessionEnd:', sessionEnd);
  const isActive = now >= sessionStart && now < sessionEnd;

  const until = sessionEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log('🚀 ~ isWithinOneHourWindow ~ until:', until);
  return { active: isActive, until };
};

const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
  videoUrl,
  sessionId,
  accountId,
  accessToken,
  sessionStartTime,
  sessionStartDisplay,
  sessionStatus,
}) => {
  const playerRef = useRef<ReactPlayer>(null);

  const [progress, setProgress] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);

  const [videoDeadlineMessage, setVideoDeadlineMessage] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type?: 'error' | 'success' | 'info';
  } | null>(null);

  const [watchedState, setWatchedState] = useState<boolean>(sessionStatus === 'COMPLETED');
  const [sessionOverdue, setSessionOverdue] = useState(sessionStatus === 'OVERDUE');

  const isMarkingWatched = useRef(false);

  useEffect(() => {
    const { active, until } = isWithinOneHourWindow(sessionStartTime);
    if (!active) {
      setSessionOverdue(true);
      setVideoDeadlineMessage(
        `⏱ This ${sessionStartDisplay ?? ''} session has expired. 
       You had 1 hour to complete it. 
       You can still watch the video, but it won't count toward the leaderboard.`,
      );
    } else {
      setVideoDeadlineMessage(
        `✅ This ${sessionStartDisplay ?? ''} session is active. 
       You have until ${until} to complete it. Completion will count toward the leaderboard.`,
      );
    }
  }, [sessionStartTime, sessionStartDisplay]);

  const showToast = (
    title: string,
    message: string,
    type: 'error' | 'success' | 'info' = 'info',
  ) => {
    setToast({ title, message, type });
  };

  const markAsWatched = async () => {
    if (watchedState || isMarkingWatched.current || sessionOverdue) return;

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

      let data: any = null;
      if (res.status !== 204) {
        try {
          data = await res.json();
        } catch {
          data = null; // no JSON, that’s fine
        }
      }

      if (!res.ok) {
        const errorMsg = data?.message || 'An error occurred while marking the video as watched.';

        if (res.status === 409 || errorMsg.includes('Session is already finished')) {
          setSessionOverdue(true);
          setWatchedState(false);
          showToast(
            'Session Finished',
            'This session is already closed. You can still watch the video, but no points will be awarded.',
            'info',
          );
        } else {
          showToast('Failed to Save Progress', errorMsg, 'error');
        }
        return;
      }

      // ✅ Success
      const counts =
        data?.countsTowardLeaderboard ??
        (data?.sessionStatus ? data.sessionStatus !== 'OVERDUE' : undefined);

      if (counts === false) {
        setSessionOverdue(true);
        setWatchedState(false);
        showToast(
          'Video Completed',
          "Nice work! We've recorded your completion, but it won't count toward the leaderboard.",
          'info',
        );
      } else {
        setWatchedState(true);
        setSessionOverdue(false);
        showToast('Nice Work!', 'Video successfully marked as completed.', 'success');
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      showToast('Error', 'Something went wrong. Please try again later.', 'error');
    } finally {
      isMarkingWatched.current = false;
    }
  };

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

      {/* Progress for screen readers */}
      <div className="sr-only" aria-live="polite">
        {Math.round(progress * 100)}% watched
      </div>

      {/* Video & Interaction Area */}
      {!watchedState && !manualOverride && !sessionOverdue && (
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
                className="absolute top-full mt-2 right-0 w-max bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg z-10 hidden group-hover:block group-focus-within:block whitespace-nowrap"
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
              onProgress={(state) => setProgress(state.played)}
              onEnded={markAsWatched} // 100% complete → safe to notify backend
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
          {watchedState && !sessionOverdue && (
            <>
              <div
                className="animate-bounce bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-2xl font-semibold"
                aria-label={`Video completed for your ${sessionStartDisplay ?? ''} session`}
              >
                🏅
              </div>
              <p className="text-lg text-gray-900 font-medium text-center">
                Nice work on completing your <strong>{sessionStartDisplay ?? ''}</strong> session!
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
