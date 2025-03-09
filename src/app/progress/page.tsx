import React from 'react';
import MetricsSection from './Metrics';

// Sample data structure remains the same as before
const biometricsData = [
  {
    date: 'Jan 2025',
    average: 85,
    metrics: {
      weight: 85,
      fatPercentage: 15,
      visceralFat: 8,
    },
  },
  {
    date: 'Feb 2025',
    average: 83,
    metrics: {
      weight: 83,
      fatPercentage: 14.5,
      visceralFat: 7.5,
    },
  },
  {
    date: 'Mar 2025',
    average: 82,
    metrics: {
      weight: 82,
      fatPercentage: 14,
      visceralFat: 7,
    },
  },
];

const mobilityData = [
  {
    date: 'Jan 2025',
    average: 1.3,
    metrics: {
      hips: 1,
      shoulder: 1,
      back: 2,
    },
  },
  {
    date: 'Feb 2025',
    average: 1.7,
    metrics: {
      hips: 2,
      shoulder: 1,
      back: 2,
    },
  },
  {
    date: 'Mar 2025',
    average: 2,
    metrics: {
      hips: 2,
      shoulder: 1,
      back: 2,
    },
  },
];

const biometricsMetrics = [
  { key: 'weight', label: 'Weight', suffix: 'kg' },
  { key: 'fatPercentage', label: 'Fat %', suffix: '%' },
  { key: 'visceralFat', label: 'Visceral Fat' },
];

const mobilityMetrics = [
  { key: 'hips', label: 'Hips' },
  { key: 'shoulder', label: 'Shoulder' },
  { key: 'back', label: 'Back' },
];

export default function ProgressPage() {
  return (
    <section className="max-w-5xl w-full mx-auto p-6">
      <div className="space-y-16">
        <MetricsSection
          title="Biometrics"
          data={biometricsData}
          metrics={biometricsMetrics}
          color="blue"
        />

        <MetricsSection
          title="Mobility"
          data={mobilityData}
          metrics={mobilityMetrics}
          color="green"
        />
      </div>
    </section>
  );
}
