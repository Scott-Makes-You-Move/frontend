import LeaderboardTable, { LeaderboardUser } from './LeaderboardTable';
import WinnerDisplay from './WinnerDisplay';
import requireAuth from '@/lib/auth/requireAuth';

const LeaderboardPage = async () => {
  const session = await requireAuth({ callbackUrl: '/leaderboard' });

  const res = await fetch(
    'https://backend.scottmakesyoumove.com/api/v1/leaderboard?page=0&size=10&direction=desc&sortBy=completionRate',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
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
        <WinnerDisplay name={lastMonthWinner} isMobile={true} />
        <div className="mb-8">
          <LeaderboardTable data={leaderboardData} />
        </div>
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
