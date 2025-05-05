import { draftMode } from 'next/headers';
import QuoteCard from '@/components/QuoteCard';
import TimeDisplay from '@/components/TimeDisplay';
import SmartVideoPlayer from '@/components/SmartVideoPlayer';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import requireAuth from '@/lib/auth/requireAuth';
import { getWeeklyQuote } from '@/utils/getWeeklyQuote';

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

export default async function Home() {
  await requireAuth({ callbackUrl: '/' });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const { movementBreak, exerciseVideo, quote } = await executeQuery<HomePageQueryResult, never>(
    query,
    {
      includeDrafts: isDraftModeEnabled,
    },
  );
  const weeklyQuote = getWeeklyQuote(quote.quotelist);

  return (
    <section className="w-full p-4">
      <div className="flex flex-col gap-4 md:grid md:grid-rows-[auto_1fr_auto]">
        <div className="flex justify-start">
          <TimeDisplay
            nextBreakPrefix={movementBreak.reminderPrefix}
            nextBreakTime={movementBreak.nextBreakTime}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-4xl">
            {/*             <EmbeddedVideo title={exerciseVideo.title} videoUrl={exerciseVideo.videoUrl} />
             */}

            <SmartVideoPlayer
              title={exerciseVideo.title}
              videoUrl={exerciseVideo.videoUrl}
              videoId="abc123" // Replace with real ID from backend!
            />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <QuoteCard title={quote.title} quote={weeklyQuote.text} author={weeklyQuote.author} />
        </div>
      </div>
    </section>
  );
}
