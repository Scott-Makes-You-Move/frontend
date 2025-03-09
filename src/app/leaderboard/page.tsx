import React from 'react';
import { Trophy } from 'lucide-react';

type LeaderboardUser = {
  id: number;
  name: string;
  rank: number;
  streak: number;
};

type LeaderboardTableProps = {
  data: LeaderboardUser[];
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  const getRankStyle = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'bg-accent text-background';
      case 2:
        return 'bg-gray-300 text-gray-800';
      case 3:
        return 'bg-amber-600 text-background';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="text-left p-3 font-title">Rank</th>
          <th className="text-left p-3 font-title">Name</th>
          <th className="text-right p-3 font-title">Streak</th>
        </tr>
      </thead>
      <tbody className="font-body">
        {data.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
            <td className="p-3">
              <div className="flex items-center justify-center">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getRankStyle(user.rank)}`}
                >
                  {user.rank}
                </span>
              </div>
            </td>
            <td className="p-3 font-medium">{user.name}</td>
            <td className="p-3 text-right">
              <span className="bg-primary text-background py-1 px-3 rounded-full text-sm font-medium">
                {user.streak}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Winner display component to avoid repetition
const WinnerDisplay: React.FC<{ name: string; isMobile: boolean }> = ({ name, isMobile }) => (
  <div className="flex flex-col items-center text-center">
    <Trophy className={`${isMobile ? 'w-16 h-16 mb-2' : 'w-24 h-24 mb-4'} text-accent`} />
    <p className="text-sm text-gray-600 font-body">Last month's winner</p>
    <p className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium font-title`}>{name}</p>
  </div>
);

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
      {/* Mobile layout */}
      <div className="block md:hidden">
        <div className="mb-8">
          <LeaderboardTable data={leaderboardData} />
        </div>
        <WinnerDisplay name={lastMonthWinner} isMobile={true} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8">
        <div>
          <LeaderboardTable data={leaderboardData} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <WinnerDisplay name={lastMonthWinner} isMobile={false} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
