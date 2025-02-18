import QuoteCard from '@/components/QuoteCard';
import EmbeddedVideo from '@/components/EmbeddedVideo';
import TimeDisplay from '@/components/TimeDisplay';

export default function Home() {
  return (
    <section className="w-full p-4 md:min-h-screen">
      <div className="flex flex-col gap-4 md:grid md:grid-rows-[auto_1fr_auto]">
        <div className="flex justify-start">
          <TimeDisplay nextBreak="1:30 PM" />
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-4xl">
            <EmbeddedVideo videoUrl="https://www.youtube.com/embed/4Xuddq77lRM" />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <QuoteCard quote="We are what we repeatedly do. Excellence is not an act, but a habit." />
        </div>
      </div>
    </section>
  );
}

{
  /* <section className="w-full ">
      <div className="flex flex-col items-center justify-start gap-4 md:grid md:grid-cols-2 md:place-items-center p-4">
        <TimeDisplay nextBreak="1:30 PM" />

        <div className="md:col-span-2 w-full max-w-4xl">
          <EmbeddedVideo videoUrl="https://www.youtube.com/embed/4Xuddq77lRM" />
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <QuoteCard quote="We are what we repeatedly do. Excellence is not an act, but a habit." />
      </div>
    </section> */
}
