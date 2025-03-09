import { Trophy } from 'lucide-react';

type LeaderboardUser = {
  id: number;
  name: string;
  rank: number;
  streak: number;
};

const LeaderboardPage = () => {
  const leaderboardData: LeaderboardUser[] = [
    { id: 1, name: 'Philip Roberts', rank: 1, streak: 96 },
    { id: 2, name: 'Lucia Morales', rank: 2, streak: 94 },
    { id: 3, name: 'Jeroen Verhoeven', rank: 3, streak: 89 },
    { id: 4, name: 'Tessa Liem', rank: 4, streak: 75 },
    { id: 5, name: 'Gerard Vos', rank: 5, streak: 63 },
  ];

  const lastMonthWinner = 'Tessa Liem';

  const renderRank = (rank: number) => (
    <div className="flex items-center justify-center">
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
          rank === 1
            ? 'bg-yellow-400 text-white'
            : rank === 2
              ? 'bg-gray-300 text-gray-800'
              : rank === 3
                ? 'bg-amber-600 text-white'
                : 'text-gray-600'
        }`}
      >
        {rank}
      </span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Mobile: Stacked layout */}
      <div className="block md:hidden">
        {/* Leaderboard Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Rank</th>
                <th className="text-left p-3">Name</th>
                <th className="text-right p-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{renderRank(user.rank)}</td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-right">{user.streak}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Last Month's Winner Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mb-2" />
          <p className="text-sm text-gray-600">Last month's winner</p>
          <p className="text-lg font-medium">{lastMonthWinner}</p>
        </div>
      </div>

      {/* Desktop: Two-column layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8">
        {/* Left Column: Leaderboard Table */}
        <div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Rank</th>
                <th className="text-left p-3">Name</th>
                <th className="text-right p-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{renderRank(user.rank)}</td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-right">{user.streak}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column: Last Month's Winner */}
        <div className="flex flex-col items-center justify-center">
          <Trophy className="w-24 h-24 text-yellow-500 mb-4" />
          <p className="text-sm text-gray-600">Last month's winner</p>
          <p className="text-xl font-medium">{lastMonthWinner}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
