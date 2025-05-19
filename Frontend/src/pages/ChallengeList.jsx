import { useState, useEffect } from 'react';
import { useChallenges } from '../contexts/ChallengesContext';
import ChallengeCard from '../components/challenges/ChallengeCard';
import api from '../services/api'; // Import api directly for debugging
import axios from 'axios';

const ChallengeList = () => {
  const { getAllChallenges } = useChallenges();
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all',
    searchQuery: ''
  });

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['Algorithms', 'Data Structures', 'Web Development', 'Database', 'Machine Learning'];

  useEffect(() => {
    document.title = 'Challenges - Skillify';
    
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        // Add this console log to see if we're entering this function
        console.log('Fetching challenges...');
        
        // Use direct API call for debugging
        const response = await api.get('/challenges');
        console.log('API Response:', response);
        
        const data = response.data;
        console.log('Challenge data:', data);
        
        if (Array.isArray(data)) {
          setChallenges(data);
          setFilteredChallenges(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Received invalid data format');
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('Failed to load challenges');
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...challenges];
    
    if (filters.difficulty !== 'all') {
      result = result.filter(challenge => challenge.difficulty === filters.difficulty);
    }
    
    if (filters.category !== 'all') {
      result = result.filter(challenge => challenge.category === filters.category);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(challenge => 
        challenge.title.toLowerCase().includes(query) || 
        (challenge.description && challenge.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredChallenges(result);
  }, [challenges, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      difficulty: 'all',
      category: 'all',
      searchQuery: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coding Challenges</h1>
      
      {/* Debug info - remove in production */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p>Total challenges: {challenges.length}</p>
        <p>Filtered challenges: {filteredChallenges.length}</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleSearch}
              placeholder="Search challenges..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Challenge List */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge._id || challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-500 mb-6">There are no challenges matching your current filters.</p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;