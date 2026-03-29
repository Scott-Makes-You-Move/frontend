import requireAuth from '@/lib/auth/requireAuth';
import ProgressDashboard from './ProgressDashboard';

export default async function ProgressPage() {
  const session = await requireAuth({ callbackUrl: '/progress' });
  const BACKEND_HOST = process.env.BACKEND_HOST ?? 'http://localhost:8080';

  const { accountId, accessToken } = session;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const [biometricsRes, mobilityRes] = await Promise.all([
    fetch(`${BACKEND_HOST}/api/v1/account/${accountId}/biometrics`, {
      headers,
      cache: 'no-store',
    }),
    fetch(`${BACKEND_HOST}/api/v1/account/${accountId}/mobilities`, {
      headers,
      cache: 'no-store',
    }),
  ]);

  if (!biometricsRes.ok || !mobilityRes.ok) {
    throw new Error('Failed to fetch metrics');
  }

  const biometricsRaw = await biometricsRes.json();
  const mobilityRaw = await mobilityRes.json();

  const biometricsData = biometricsRaw.content
    .map((entry: any) => ({
      date: entry.measuredOn,
      average: (entry.weight + entry.fat + entry.visceralFat) / 3,
      metrics: {
        weight: entry.weight,
        fatPercentage: entry.fat,
        visceralFat: entry.visceralFat,
      },
    }))
    .reverse();

  const mobilityData = mobilityRaw.content
    .map((entry: any) => ({
      date: entry.measuredOn,
      average: (entry.hip + entry.shoulder + entry.back) / 3,
      metrics: {
        hip: entry.hip,
        shoulder: entry.shoulder,
        back: entry.back,
      },
    }))
    .reverse();

  return <ProgressDashboard initialBiometrics={biometricsData} initialMobility={mobilityData} />;
}
