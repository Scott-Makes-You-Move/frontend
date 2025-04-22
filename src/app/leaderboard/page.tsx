import LeaderboardTable, { LeaderboardUser } from './LeaderboardTable';
import WinnerDisplay from './WinnerDisplay';

const LeaderboardPage = async () => {
  const res = await fetch(
    'https://smym-backend-service.azurewebsites.net/api/v1/leaderboard?page=0&size=10&direction=desc&sortBy=completionRate',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYb3JTUkZVSXE4UUhTM3lUTmx0TDQxNnNSUW5PblJkRHE3RUJqOUx3WTNjIn0.eyJleHAiOjE3NDUzNTI0NzIsImlhdCI6MTc0NTM1MjE3MiwianRpIjoiZjA5NmE1YjEtMDI2My00YWY1LTllMTgtYzg2NGQ3NWY1ZmExIiwiaXNzIjoiaHR0cHM6Ly9zbXltLWtleWNsb2FrLWdkYWRjZGhhYjhkeWRnY3oud2VzdGV1cm9wZS0wMS5henVyZXdlYnNpdGVzLm5ldC9yZWFsbXMvc215bS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmRjOGRkMmEtNTE1MS00YzBjLWE5NTUtYWUyOTliYmZjNTE1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic215bS1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNmQxMjMzMzItYmZlZC00Mzk3LWIyNjctMDhlYzM4YjM2MTczIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNteW0tZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjZkMTIzMzMyLWJmZWQtNDM5Ny1iMjY3LTA4ZWMzOGIzNjE3MyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW5kZXIiOiJNYWxlIiwibmFtZSI6Ik1hbGNvbG0gS2VudGUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYWxjb2xtIiwiZ2l2ZW5fbmFtZSI6Ik1hbGNvbG0iLCJmYW1pbHlfbmFtZSI6IktlbnRlIiwiZW1haWwiOiJtYWxjb2xtLmtlbnRlQGdtYWlsLmNvbSJ9.L6IsFngKs_FxZhdO4SQcrWCoiNo19QLbzrtxc6YPLj7PKK15MY2tCuDeQi9fRlCHbTYfsQOExcSbJnxp3d2cjqEkH-cY8LJ7-TlzDZpIj8d4GHvgtFDTMa8njsae9tEaBFu_Y2MKSlxahqJ06b5GiRyFk_xFdTKgY32zq3ADDyrppBm_HniRzLucHSqb_DAeQMUGRsrAbXiLvirTG7ErHDCfhsLzJCLI5DLSV5ny9L5jTp8PoaLmbVFnNmxq7YuAezPce5FACwYu37iCp3wqQOcgtHYhEN3aorhl4FBRrcjs0E53fvTaamulSczK-4vHd5TlfdIIRj6qrsUIzt97pA
`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard data');
  }

  const { content } = await res.json();

  const leaderboardData: LeaderboardUser[] = content.map((user: any, index: number) => ({
    id: index + 1,
    name: user.fullName,
    rank: index + 1,
    streak: Math.round(user.completionRate),
  }));

  const lastMonthWinner = leaderboardData[0]?.name ?? 'N/A';

  return (
    <div className="max-w-4xl mx-auto p-4">
      <a href="#leaderboard" className="sr-only focus:not-sr-only">
        Skip to leaderboard
      </a>

      {/* Mobile layout */}
      <section className="block md:hidden">
        <div className="mb-8">
          <LeaderboardTable data={leaderboardData} />
        </div>
        <WinnerDisplay name={lastMonthWinner} isMobile={true} />
      </section>

      {/* Desktop layout */}
      <section className="hidden md:grid md:grid-cols-2 md:gap-8">
        <div id="leaderboard">
          <LeaderboardTable data={leaderboardData} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <WinnerDisplay name={lastMonthWinner} isMobile={false} />
        </div>
      </section>
    </div>
  );
};

export default LeaderboardPage;
