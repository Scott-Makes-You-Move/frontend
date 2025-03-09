export type LeaderboardUser = {
  id: number;
  name: string;
  rank: number;
  streak: number;
};

interface LeaderboardTableProps {
  data: LeaderboardUser[];
}

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

export default LeaderboardTable;
