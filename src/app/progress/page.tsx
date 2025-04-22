import ProgressDashboard from './ProgressDashboard';

export default async function ProgressPage() {
  const headers = {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYb3JTUkZVSXE4UUhTM3lUTmx0TDQxNnNSUW5PblJkRHE3RUJqOUx3WTNjIn0.eyJleHAiOjE3NDUzNTI0NzIsImlhdCI6MTc0NTM1MjE3MiwianRpIjoiZjA5NmE1YjEtMDI2My00YWY1LTllMTgtYzg2NGQ3NWY1ZmExIiwiaXNzIjoiaHR0cHM6Ly9zbXltLWtleWNsb2FrLWdkYWRjZGhhYjhkeWRnY3oud2VzdGV1cm9wZS0wMS5henVyZXdlYnNpdGVzLm5ldC9yZWFsbXMvc215bS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmRjOGRkMmEtNTE1MS00YzBjLWE5NTUtYWUyOTliYmZjNTE1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic215bS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNmQxMjMzMzItYmZlZC00Mzk3LWIyNjctMDhlYzM4YjM2MTczIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNteW0tZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjZkMTIzMzMyLWJmZWQtNDM5Ny1iMjY3LTA4ZWMzOGIzNjE3MyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW5kZXIiOiJNYWxlIiwibmFtZSI6Ik1hbGNvbG0gS2VudGUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYWxjb2xtIiwiZ2l2ZW5fbmFtZSI6Ik1hbGNvbG0iLCJmYW1pbHlfbmFtZSI6IktlbnRlIiwiZW1haWwiOiJtYWxjb2xtLmtlbnRlQGdtYWlsLmNvbSJ9.L6IsFngKs_FxZhdO4SQcrWCoiNo19QLbzrtxc6YPLj7PKK15MY2tCuDeQi9fRlCHbTYfsQOExcSbJnxp3d2cjqEkH-cY8LJ7-TlzDZpIj8d4GHvgtFDTMa8njsae9tEaBFu_Y2MKSlxahqJ06b5GiRyFk_xFdTKgY32zq3ADDyrppBm_HniRzLucHSqb_DAeQMUGRsrAbXiLvirTG7ErHDCfhsLzJCLI5DLSV5ny9L5jTp8PoaLmbVFnNmxq7YuAezPce5FACwYu37iCp3wqQOcgtHYhEN3aorhl4FBRrcjs0E53fvTaamulSczK-4vHd5TlfdIIRj6qrsUIzt97pA
`,
    'Content-Type': 'application/json',
  };

  const [biometricsRes, mobilityRes] = await Promise.all([
    fetch(
      `https://smym-backend-service.azurewebsites.net/api/v1/account/bdc8dd2a-5151-4c0c-a955-ae299bbfc515/biometrics`,
      {
        headers,
        cache: 'no-store',
      },
    ),
    fetch(
      `https://smym-backend-service.azurewebsites.net/api/v1/account/bdc8dd2a-5151-4c0c-a955-ae299bbfc515/mobilities`,
      {
        headers,
        cache: 'no-store',
      },
    ),
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

  return <ProgressDashboard initialBiometrics={biometricsData} initialMobility={mobilityData} />;
}
