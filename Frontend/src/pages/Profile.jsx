import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    bio: '',
    github: '',
    linkedin: '',
    twitter: '',
    preferredLanguage: '',
  });
  const [statistics, setStatistics] = useState({
    completedChallenges: 0,
    totalPoints: 0,
    rank: 0,
    badges: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch this data from your API
      // Simulating profile data
      setUserData({
        fullName: user.fullName || 'Mohit Samota',
        email: user.email || 'mohit.samota@example.com',
        bio: user.bio || 'Full-stack developer passionate about solving algorithmic challenges.',
        github: user.github || 'github.com/Mohit-Samota',
        linkedin: user.linkedin || 'linkedin.com/in/Mohit-Samota',
        twitter: user.twitter || 'twitter.com/Mohit-Samota',
        preferredLanguage: user.preferredLanguage || 'JavaScript',
      });

      // Simulating statistics data
      setStatistics({
        completedChallenges: 28,
        totalPoints: 1520,
        rank: 42,
        badges: [
          { id: 1, name: 'Algorithm Ace', description: 'Solved 10 algorithm challenges', icon: '🏆' },
          { id: 2, name: 'Data Structure Guru', description: 'Solved 5 data structure challenges', icon: '🔍' },
          { id: 3, name: 'JavaScript Wizard', description: 'Completed 15 JavaScript challenges', icon: '✨' },
        ],
        recentActivity: [
          { id: 1, type: 'challenge_completed', challenge: 'Binary Search Tree', date: '2023-07-15', points: 120 },
          { id: 2, type: 'challenge_completed', challenge: 'Merge Sort Implementation', date: '2023-07-10', points: 100 },
          { id: 3, type: 'badge_earned', badge: 'Algorithm Ace', date: '2023-07-05' },
        ]
      });
      
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would call your API to update the profile
      // await updateUserProfile(userData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub
                      </label>
                      <input
                        type="text"
                        name="github"
                        value={userData.github}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        value={userData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="twitter"
                        value={userData.twitter}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Language
                      </label>
                      <select
                        name="preferredLanguage"
                        value={userData.preferredLanguage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="Ruby">Ruby</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.fullName}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{userData.fullName}</h2>
                        <p className="text-gray-600">{userData.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700">{userData.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact & Social</h3>
                      <ul className="space-y-2">
                        {userData.github && (
                          <li className="flex items-center">
                            <span className="text-gray-600 mr-2">GitHub:</span>
                            <a href={`https://${userData.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              {userData.github}
                            </a>
                          </li>
                        )}
                        {userData.linkedin && (
                          <li className="flex items-center">
                            <span className="text-gray-600 mr-2">LinkedIn:</span>
                            <a href={`https://${userData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              {userData.linkedin}
                            </a>
                          </li>
                        )}
                        {userData.twitter && (
                          <li className="flex items-center">
                            <span className="text-gray-600 mr-2">Twitter:</span>
                            <a href={`https://${userData.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              {userData.twitter}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Preferred Language:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                          {userData.preferredLanguage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            <div className="p-6">
              {statistics.recentActivity.length > 0 ? (
                <ul className="space-y-4">
                  {statistics.recentActivity.map((activity) => (
                    <li key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      {activity.type === 'challenge_completed' ? (
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">Completed challenge: </span>
                            <span className="text-blue-600">{activity.challenge}</span>
                            <p className="text-gray-500 text-sm mt-1">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                            +{activity.points} points
                          </span>
                        </div>
                      ) : activity.type === 'badge_earned' ? (
                        <div>
                          <span className="font-medium">Earned badge: </span>
                          <span className="text-purple-600">{activity.badge}</span>
                          <p className="text-gray-500 text-sm mt-1">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recent activity yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-semibold">Statistics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Challenges Completed</h3>
                  <p className="text-2xl font-bold">{statistics.completedChallenges}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-1">Total Points</h3>
                  <p className="text-2xl font-bold">{statistics.totalPoints}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-1">Current Rank</h3>
                  <p className="text-2xl font-bold">#{statistics.rank}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-semibold">Badges</h2>
            </div>
            <div className="p-6">
              {statistics.badges.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4">
                  {statistics.badges.map((badge) => (
                    <li key={badge.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex justify-center items-center w-10 h-10 bg-purple-100 rounded-full mr-3">
                        <span className="text-xl">{badge.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-purple-800">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No badges earned yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;