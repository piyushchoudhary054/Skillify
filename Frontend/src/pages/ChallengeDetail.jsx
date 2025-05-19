import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ChallengeDetail = () => {
  const { id } = useParams();
  const { getChallenge } = useContext(ChallengesContext);
  const { user } = useContext(AuthContext);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getChallenge(id);
        setChallenge(challengeData);
      } catch (error) {
        toast.error('Failed to load challenge details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, getChallenge]);

  const handleStartChallenge = () => {
    if (!user) {
      toast.error('Please login to start this challenge');
      navigate('/login', { state: { from: `/challenges/${id}` } });
      return;
    }
    console.log("Challenge ID:", id);
    navigate(`/coding/${id}`);
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

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <Link to="/challenges" className="text-blue-500 hover:text-blue-700">
            Go back to all challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">{challenge.title}</h1>
          <div className="flex items-center mt-2">
            <span className="px-3 py-1 bg-blue-700 text-white text-sm font-semibold rounded-full mr-2">
              {challenge.difficulty}
            </span>
            <span className="text-white opacity-80">
              {challenge.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <div className="prose max-w-none mb-6">
            <p>{challenge.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {challenge.requirements?.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Example</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Input:</h3>
              <pre className="bg-gray-100 p-3 rounded-md">{challenge.example?.input}</pre>
              <h3 className="font-semibold mt-4 mb-2">Output:</h3>
              <pre className="bg-gray-100 p-3 rounded-md">{challenge.example?.output}</pre>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Constraints</h2>
            <ul className="list-disc pl-5 space-y-2">
              {challenge.constraints?.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">
                <i className="fas fa-clock"></i> Time Limit:
              </span>
              <span className="font-medium">{challenge.timeLimit} minutes</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">
                <i className="fas fa-trophy"></i> Points:
              </span>
              <span className="font-medium">{challenge.points}</span>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleStartChallenge}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
            >
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;