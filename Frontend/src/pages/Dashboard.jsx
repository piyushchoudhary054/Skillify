import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChallenges } from '../contexts/ChallengesContext';
import ChallengeCard from '../components/challenges/ChallengeCard';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getUserChallenges, getInProgressChallenges, getRecentChallenges } = useChallenges();
  const [userStats, setUserStats] = useState({
    completedChallenges: 0,
    inProgressChallenges: 0,
    totalPoints: 0,
    rank: null,
    streakDays: 0
  });
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [inProgressChallenges, setInProgressChallenges] = useState([]);
  const [recentChallenges, setRecentChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard - Skillify';
    
    const fetchDashboardData = async () => {
      try {
        // Fetch user challenges data
        const userChallenges = await getUserChallenges();
        const inProgress = await getInProgressChallenges();
        const recent = await getRecentChallenges();
        
        setCompletedChallenges(userChallenges.completed || []);
        setInProgressChallenges(inProgress || []);
        setRecentChallenges(recent || []);
        
        // Set user stats
        setUserStats({
          completedChallenges: userChallenges.completed?.length || 0,
          inProgressChallenges: inProgress?.length || 0,
          totalPoints: userChallenges.totalPoints || 0,
          rank: userChallenges.rank || 'Beginner',
          streakDays: userChallenges.streakDays || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [getUserChallenges, getInProgressChallenges, getRecentChallenges]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {currentUser?.username || 'Coder'}!</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Completed Challenges</h3>
          <p className="text-3xl font-bold text-blue-600">{userStats.completedChallenges}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-500">{userStats.inProgressChallenges}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Points</h3>
          <p className="text-3xl font-bold text-green-600">{userStats.totalPoints}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Current Streak</h3>
          <p className="text-3xl font-bold text-purple-600">{userStats.streakDays} days</p>
        </div>
      </div>
      
      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          {/* Add chart component here */}
          <p className="text-gray-500">Progress chart will be displayed here</p>
        </div>
      </div>
      
      {/* In Progress Challenges */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Continue Coding</h2>
          <Link to="/challenges" className="text-blue-600 hover:text-blue-800">
            View all challenges
          </Link>
        </div>
        
        {inProgressChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressChallenges.slice(0, 3).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">You don't have any challenges in progress.</p>
            <Link to="/challenges" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Find a challenge
            </Link>
          </div>
        )}
      </div>
      
      {/* Recommended Challenges */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
        {recentChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentChallenges.slice(0, 3).map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No recommended challenges available at the moment.</p>
          </div>
        )}
      </div>
      
      {/* Achievement Badges */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  index < 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm mt-2">{index < 2 ? 'First Challenge' : 'Locked'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;