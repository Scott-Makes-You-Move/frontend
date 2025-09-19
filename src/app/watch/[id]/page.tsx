import { draftMode } from 'next/headers';
import QuoteCard from '@/components/QuoteCard';
import TimeDisplay from '@/components/TimeDisplay';
import SmartVideoPlayer from '@/components/SmartVideoPlayer';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import requireAuth from '@/lib/auth/requireAuth';
import { getWeeklyQuote } from '@/utils/getWeeklyQuote';
import { getNextBreakTime } from '@/utils/getNextBreakTime';

interface PageProps {
  params: Promise<{ id: string }>;
}

type HomePageQueryResult = {
  movementBreak: {
    nextBreakTime: string;
    reminderPrefix: string;
  };
  exerciseVideo: {
    title: string;
    videoUrl: string;
  };
  quote: {
    title: string;
    text: string;
    quotelist: { week: number; text: string; author: string }[];
  };
};

const query = graphql<string, never>(`
  query HomePageQuery {
    movementBreak {
      nextBreakTime
      reminderPrefix
    }
    exerciseVideo {
      title
      videoUrl
    }
    quote {
      title
      text
      quotelist
    }
  }
`);

export default async function WatchPage({ params }: PageProps) {
  const { id: sessionId } = await params;
  const callbackUrl = `/watch/${sessionId}`;
  const session = await requireAuth({ callbackUrl });
  const { accountId, accessToken } = session;

  let sessionData: {
    sessionStartTime: string | null;
    sessionStartDisplay?: string | null;
    sessionExecutionTime: string | null;
    exerciseType: string | null;
    sessionStatus: string | null;
    sessionVideoUrl: string | null;
  } = {
    sessionStartTime: null,
    sessionStartDisplay: null,
    sessionExecutionTime: null,
    exerciseType: null,
    sessionStatus: null,
    sessionVideoUrl: null,
  };

  try {
    const sessionRes = await fetch(
      `https://backend.scottmakesyoumove.com/api/v1/account/${accountId}/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );

    if (!sessionRes.ok) {
      console.error(`Session fetch failed (${sessionRes.status}):`, await sessionRes.text());
      throw new Error('Session fetch error');
    }

    const data = await sessionRes.json();
    const sessionStart = new Date(data.sessionStartTime);
    const sessionStartTime = sessionStart.toISOString();
    const sessionStartDisplay = sessionStart.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam',
    });

    sessionData = {
      sessionStartTime,
      sessionStartDisplay,
      sessionExecutionTime: data.sessionExecutionTime ?? null,
      exerciseType: data.exerciseType ?? null,
      sessionStatus: data.sessionStatus ?? null,
      sessionVideoUrl: data.sessionVideoUrl ?? null,
    };
  } catch (err) {
    console.error('Error fetching session data:', err);
    throw new Error('Error fetching session data');
  }

  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { movementBreak, exerciseVideo, quote } = await executeQuery<HomePageQueryResult, never>(
    query,
    {
      includeDrafts: isDraftModeEnabled,
    },
  );
  const weeklyQuote = getWeeklyQuote(quote.quotelist);

  return (
    <section className="w-full p-4" aria-labelledby="watch-content-heading">
      <h1 id="watch-content-heading" className="sr-only">
        Watch Page Content {/* TODO: use CMS content */}
      </h1>

      <div className="flex flex-col gap-4 md:grid md:grid-rows-[auto_1fr_auto]">
        {/* Movement Break  */}
        <section aria-labelledby="movement-break-heading">
          <h2 id="movement-break-heading" className="sr-only">
            Next Movement Break {/* TODO: use CMS content */}
          </h2>

          <div className="flex justify-start">
            <TimeDisplay
              nextBreakPrefix={movementBreak.reminderPrefix}
              nextBreakTime={getNextBreakTime()}
            />
          </div>
        </section>

        {/* Exercise Video */}
        <section aria-labelledby="exercise-video-heading">
          <h2 id="exercise-video-heading" className="sr-only">
            Exercise Video {/* TODO: use CMS content */}
          </h2>

          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-4xl">
              <SmartVideoPlayer
                title={exerciseVideo.title}
                videoUrl={sessionData.sessionVideoUrl || exerciseVideo.videoUrl}
                sessionId={sessionId}
                accountId={accountId}
                accessToken={accessToken}
                sessionStartTime={sessionData.sessionStartTime}
                sessionStartDisplay={sessionData.sessionStartDisplay}
                sessionStatus={sessionData.sessionStatus}
                sessionExecutionTime={sessionData.sessionExecutionTime}
              />
            </div>
          </div>
        </section>

        {/* Quote */}
        <section aria-labelledby="weekly-quote-heading">
          <h2 id="weekly-quote-heading" className="sr-only">
            Weekly Quote {/* TODO: use CMS content */}
          </h2>
          <div className="flex justify-center md:justify-start">
            <QuoteCard title={quote.title} quote={weeklyQuote.text} author={weeklyQuote.author} />
          </div>
        </section>
      </div>
    </section>
  );
}
