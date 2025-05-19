import api from './api';

const challengeService = {
  // Get all challenges with optional filtering
  getAllChallenges: async (params = {}) => {
    try {
      const response = await api.get('/challenges', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single challenge by ID
  getChallengeById: async (id) => {
    try {
      const response = await api.get(`/challenges/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get challenges by category
  getChallengesByCategory: async (category) => {
    try {
      const response = await api.get(`/challenges/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Submit a solution to a challenge
  submitSolution: async (challengeId, solution) => {
    try {
      const response = await api.post(`/challenges/${challengeId}/submit`, { solution });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get user's challenge progress
  getUserProgress: async () => {
    try {
      const response = await api.get('/challenges/progress');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default challengeService;