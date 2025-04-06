import React from 'react';
import MetricsSection from './Metrics';
import ProgressForm from './ProgressForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';

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

export default async function ProgressPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/progress');
  }

  const accountId = session.user.accountId;
  const accessToken = session.accessToken;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const [biometricsRes, mobilityRes] = await Promise.all([
    fetch(`https://smym-backend-service.azurewebsites.net/api/v1/account/${accountId}/biometrics`, {
      headers,
      cache: 'no-store',
    }),
    fetch(`https://smym-backend-service.azurewebsites.net/api/v1/account/${accountId}/mobilities`, {
      headers,
      cache: 'no-store',
    }),
  ]);

  if (!biometricsRes.ok || !mobilityRes.ok) {
    throw new Error('Failed to fetch metrics');
  }

  const biometricsRaw = await biometricsRes.json();
  const mobilityRaw = await mobilityRes.json();

  const biometricsData = biometricsRaw.content.map((entry: any) => ({
    date: entry.measuredOn,
    average: (entry.weight + entry.fat + entry.visceralFat) / 3,
    metrics: {
      weight: entry.weight,
      fatPercentage: entry.fat,
      visceralFat: entry.visceralFat,
    },
  }));

  const mobilityData = mobilityRaw.content.map((entry: any) => ({
    date: entry.measuredOn,
    average: (entry.hips + entry.shoulder + entry.back) / 3,
    metrics: {
      hips: entry.hips,
      shoulder: entry.shoulder,
      back: entry.back,
    },
  }));

  return (
    <section className="max-w-5xl w-full mx-auto p-6 space-y-16">
      <div>
        <MetricsSection
          title="Biometrics"
          data={biometricsData}
          metrics={biometricsMetrics}
          color="blue"
        />
        <ProgressForm type="biometrics" accountId={accountId} accessToken={accessToken} />
      </div>

      <div>
        <MetricsSection
          title="Mobility"
          data={mobilityData}
          metrics={mobilityMetrics}
          color="green"
        />
        <ProgressForm type="mobility" accountId={accountId} accessToken={accessToken} />
      </div>
    </section>
  );
}
