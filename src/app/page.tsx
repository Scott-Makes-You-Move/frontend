import { draftMode } from 'next/headers';
import QuoteCard from '@/components/QuoteCard';
import EmbeddedVideo from '@/components/EmbeddedVideo';
import TimeDisplay from '@/components/TimeDisplay';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

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
    }
  }
`);

export default async function Home() {
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const session = await getServerSession(authOptions)
  const { movementBreak, exerciseVideo, quote } = await executeQuery<HomePageQueryResult, never>(
    query,
    {
      includeDrafts: isDraftModeEnabled,
    },
  );

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <section className="w-full p-4 md:min-h-screen">
      <div className="flex flex-col gap-4 md:grid md:grid-rows-[auto_1fr_auto]">
        <div className="flex justify-start">
          <TimeDisplay
            nextBreakPrefix={movementBreak.reminderPrefix}
            nextBreakTime={movementBreak.nextBreakTime}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-4xl">
            <EmbeddedVideo title={exerciseVideo.title} videoUrl={exerciseVideo.videoUrl} />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <QuoteCard title={quote.title} quote={quote.text} />
        </div>
      </div>
    </section>
  );
}
