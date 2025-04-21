'use client';

import React, { useState } from 'react';
import MetricsSection from './Metrics';
import { biometricsDummyData, mobilityDummyData } from './backup';

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

type Props = {
  initialBiometrics: any[];
  initialMobility: any[];
};

export default function ProgressDashboard({ initialBiometrics, initialMobility }: Props) {
  const [biometrics, setBiometrics] = useState(initialBiometrics);
  const [mobility, setMobility] = useState(initialMobility);

  return (
    <section className="max-w-5xl w-full mx-auto p-6 space-y-16">
      <MetricsSection
        title="Biometrics"
        data={biometrics}
        metrics={biometricsMetrics}
        color="#3B82F6"
        onFallbackClick={() => setBiometrics(biometricsDummyData)}
      />

      <MetricsSection
        title="Mobility"
        data={mobility}
        metrics={mobilityMetrics}
        color="#10B981"
        onFallbackClick={() => setMobility(mobilityDummyData)}
      />
    </section>
  );
}
