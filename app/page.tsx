import QuoteCard from "@/components/QuoteCard";
import EmbeddedVideo from "@/components/EmbeddedVideo";
import TimeDisplay from "@/components/TimeDisplay";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center border-2 border-red-500 border-b-8">
      <section className="max-w-2xl">
        <p className="text-lg text-gray-700 mt-4">
          Your daily movement tracker for a healthier lifestyle.
        </p>

        <QuoteCard
          quote={
            "We are what we repeatedly do. Excellence is not an act, but a habit."
          }
        />

        <EmbeddedVideo videoUrl="https://www.youtube.com/embed/4Xuddq77lRM" />

        <TimeDisplay nextBreak="1:30 PM" />
      </section>
    </main>
  );
}
