import { draftMode } from 'next/headers';
import QuoteCard from '@/components/QuoteCard';
import TimeDisplay from '@/components/TimeDisplay';
import SmartVideoPlayer from '@/components/SmartVideoPlayer';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import requireAuth from '@/lib/auth/requireAuth';
import { getWeeklyQuote } from '@/utils/getWeeklyQuote';

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

const query = graphql<string, never>(/* GraphQL */ `
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
  const session = await requireAuth({ callbackUrl: '/' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { movementBreak, exerciseVideo, quote } = await executeQuery<HomePageQueryResult, never>(
    query,
    {
      includeDrafts: isDraftModeEnabled,
    },
  );
  const weeklyQuote = getWeeklyQuote(quote.quotelist);
  const { id: sessionId } = params;
  const { accountId, accessToken } = session;

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
              nextBreakTime={movementBreak.nextBreakTime}
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
                videoUrl={exerciseVideo.videoUrl}
                sessionId={sessionId}
                accountId={accountId}
                accessToken={accessToken}
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
