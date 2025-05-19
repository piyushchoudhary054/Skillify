import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const ChallengesContext = createContext()

export { ChallengesContext }

export const useChallenges = () => useContext(ChallengesContext)

export const ChallengesProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get('/challenges')
        setChallenges(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch challenges')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const getAllChallenges = async () => {
    try {
      const response = await api.get('/challenges')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch challenges')
    }
  }

  const getChallenge = async (id) => {
    try {
      const response = await api.get(`/challenges/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch challenge')
    }
  }

  const submitSolution = async (challengeId, code, language) => {
    try {
      console.log('Submitting solution with data:', { challengeId, code, language }); // Log the data being sent
      const response = await api.post(`/submissions`, { challengeId, code, language });
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in submitSolution:', error); // Log the full error object
      if (error.response) {
        // Log the response error details
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw new Error(error.response?.data?.message || 'Failed to submit solution');
    }
  }
  

  const getUserSubmissions = async (userId) => {
    try {
      const response = await api.get(`/submissions/user/${userId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user submissions')
    }
  }

  // New methods for Dashboard component
  const getUserChallenges = async () => {
    try {
      const response = await api.get('/users/challenges')
      return {
        completed: response.data.completedChallenges || [],
        totalPoints: response.data.totalPoints || 0,
        rank: response.data.rank || 'Beginner',
        streakDays: response.data.streakDays || 0
      }
    } catch (error) {
      console.error('Error fetching user challenges:', error)
      return { completed: [], totalPoints: 0, rank: 'Beginner', streakDays: 0 }
    }
  }

  const getInProgressChallenges = async () => {
    try {
      const response = await api.get('/users/challenges/in-progress')
      return response.data || []
    } catch (error) {
      console.error('Error fetching in-progress challenges:', error)
      return []
    }
  }

  const getRecentChallenges = async () => {
    try {
      const response = await api.get('/users/challenges/recommended')
      return response.data || []
    } catch (error) {
      console.error('Error fetching recent challenges:', error)
      return []
    }
  }

  const value = {
    challenges,
    loading,
    error,
    getAllChallenges,
    getChallenge,
    submitSolution,
    getUserSubmissions,
    getUserChallenges,
    getInProgressChallenges,
    getRecentChallenges
  }

  return <ChallengesContext.Provider value={value}>{children}</ChallengesContext.Provider>
}