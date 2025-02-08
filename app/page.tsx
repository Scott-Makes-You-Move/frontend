import QuoteCard from "@/components/QuoteCard";
import EmbeddedVideo from "@/components/EmbeddedVideo";
import TimeDisplay from "@/components/TimeDisplay";

export default function Home() {
  return (
    <section className="w-full ">
      <p className="text-lg text-gray-700 mt-4 text-center pb-2">
        Your daily movement tracker for a healthier lifestyle.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 md:grid md:grid-cols-3 md:place-items-center ">
        <TimeDisplay nextBreak="1:30 PM" />

        <EmbeddedVideo videoUrl="https://www.youtube.com/embed/4Xuddq77lRM" />

        <QuoteCard
          quote={
            "We are what we repeatedly do. Excellence is not an act, but a habit."
          }
        />
      </div>
    </section>
  );
}
