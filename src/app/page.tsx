'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

const Home = () => {
  return (
    <main className="min-h-screen bg-background font-body text-gray-900">
      {/* Hero */}
      <section className="bg-primary text-white py-24 px-6 md:px-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-title font-bold mb-6">
            Move More. Feel Better.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Just one minute of movement a day—built for office life.
          </p>
          <Button variant="secondary" size="lg">
            Get Started
          </Button>
        </div>
      </section>

      {/* Program */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-title font-semibold text-primary mb-4">The Program</h2>
          <p className="text-gray-700 mb-12">
            Movement that fits into your day—personal, preventative, and team-friendly.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              ['Personal', 'Custom to your posture and workflow.'],
              ['Preventative', 'Stay energized and avoid pain.'],
              ['Community', 'Move with your team in sync.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary shadow-sm"
              >
                <h3 className="text-xl font-semibold font-title mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App */}
      <section className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-title font-semibold text-primary mb-4">The App</h2>
          <p className="text-gray-700 mb-12">
            Daily 1-minute prompts. Streaks. Leaderboards. Community. No gym required.
          </p>

          <Button variant="default" size="lg">
            Try It Now
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;

