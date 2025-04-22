import Image from 'next/image';

const AboutPage = () => {
  return (
    <>
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src="https://placehold.co/600x1400.png"
          alt="Team working"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="bg-primary text-background px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block border border-background text-background text-xs px-4 py-1 rounded-full mb-6">
            About OptiFit
          </span>

          <h1 className="text-4xl md:text-5xl font-title font-black leading-tight">
            Encouraging daily activity with movement.
          </h1>
        </div>
      </section>

      <section className="bg-muted/20 px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] relative">
            <Image
              src="https://placehold.co/300x400.png"
              alt="Developers working"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
          <div className="text-foreground space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-title font-bold">Who We Are</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              At OptiFit, we believe that movement is medicine. Our platform is designed with one
              simple goal: to help you embrace an active, vibrant lifestyle through the power of
              daily movement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
