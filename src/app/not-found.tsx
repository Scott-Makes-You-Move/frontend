'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

const NotFound = () => {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center bg-white text-center px-4"
      role="main"
      aria-labelledby="not-found-heading"
    >
      <div className="max-w-md">
        <h1
          id="not-found-heading"
          className="text-6xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2"
          aria-label="404"
        >
          4
          <span className="relative inline-flex items-center justify-center w-10 h-10">
            <Spinner className="h-10 w-10 text-blue-600" />
            <span className="sr-only">0</span>
          </span>
          4
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
