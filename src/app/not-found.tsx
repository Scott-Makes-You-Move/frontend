'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const NotFound = () => {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center bg-white text-center px-4"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <div className="max-w-md">
        <h1 id="not-found-heading" className="text-6xl font-bold text-primary mb-4">
          404
        </h1>
        <p className="text-xl font-semibold text-gray-900 mb-2">Oops! Page not found.</p>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>

        <Button
          as={Link}
          href="/"
          variant="default"
          size="default"
          className="bg-primary text-background hover:bg-primary/90 rounded-full font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          Go back home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
