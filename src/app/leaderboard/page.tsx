import LeaderboardTable, { LeaderboardUser } from './LeaderboardTable';
import WinnerDisplay from './WinnerDisplay';

const LeaderboardPage = () => {
  const leaderboardData: LeaderboardUser[] = [
    { id: 1, name: 'Philip Roberts', rank: 1, streak: 96 },
    { id: 2, name: 'Lucia Morales', rank: 2, streak: 94 },
    { id: 3, name: 'Jeroen Verhoeven', rank: 3, streak: 89 },
    { id: 4, name: 'Tessa Liem', rank: 4, streak: 75 },
    { id: 5, name: 'Gerard Vos', rank: 5, streak: 63 },
  ];

  const lastMonthWinner = 'Tessa Liem';

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
