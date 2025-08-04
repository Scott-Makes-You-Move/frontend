'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const ErrorPage = () => {
  return (
    <section
      role="main"
      aria-labelledby="error-heading"
      className="flex min-h-screen flex-col items-center justify-center bg-white text-center px-4"
    >
      <div className="max-w-md">
        <h1 id="error-heading" className="text-4xl font-bold text-red-700 mb-4">
          Something went wrong
        </h1>

        <p className="text-gray-700 mb-6">
          We encountered an error while loading this page. Please try again later.
        </p>

        <Button
          as={Link}
          href="/"
          variant="default"
          size="default"
          className="bg-primary text-background hover:bg-primary/90 rounded-full font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          Back to Home
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
