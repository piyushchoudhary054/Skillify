import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('monthly'); // 'weekly', 'monthly', 'allTime'

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call like:
        // const response = await api.get(`/leaderboard?timeframe=${timeframe}`);
        // const data = response.data;
        
        // Simulating API response for demonstration
        const mockData = [
          { rank: 1, username: 'codemaster', points: 2450, challenges: 42, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=codemaster' },
          { rank: 2, username: 'pythonista', points: 2320, challenges: 38, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=pythonista' },
          { rank: 3, username: 'javascripter', points: 2180, challenges: 35, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=javascripter' },
          { rank: 4, username: 'algoguru', points: 2050, challenges: 32, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=algoguru' },
          { rank: 5, username: 'hackerpro', points: 1920, challenges: 30, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=hackerpro' },
          { rank: 6, username: 'devninja', points: 1820, challenges: 28, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=devninja' },
          { rank: 7, username: 'codewarrior', points: 1720, challenges: 26, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=codewarrior' },
          { rank: 8, username: 'bitlogic', points: 1650, challenges: 25, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=bitlogic' },
          { rank: 9, username: 'syntaxqueen', points: 1580, challenges: 24, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=syntaxqueen' },
          { rank: 10, username: 'debugdude', points: 1520, challenges: 23, avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=debugdude' },
        ];
        
        setLeaderboardData(mockData);
      } catch (error) {
        toast.error('Failed to load leaderboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  const getRankStyles = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white';
      case 2:
        return 'bg-gray-300 text-gray-800';
      case 3:
        return 'bg-amber-700 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Skillify Leaderboard</h1>
      
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeframe === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('allTime')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeframe === 'allTime'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            All Time
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenges Completed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((user) => (
                  <tr key={user.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankStyles(user.rank)}`}>
                        {user.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt={user.username}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600">
                        {user.points.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.challenges}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;