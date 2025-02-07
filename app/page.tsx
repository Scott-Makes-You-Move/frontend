import QuoteCard from "@/components/QuoteCard";
import CTAButton from "@/components/CTAButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Scott Makes You Move
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Your daily movement tracker for a healthier lifestyle.
        </p>

        <QuoteCard
          quote={
            "We are what we repeatedly do. Excellence is not an act, but a habit."
          }
        />

        {/* CTA Button */}
        <CTAButton text={"Start Moving 🚀"} />
      </section>{" "}
    </main>
  );
}
