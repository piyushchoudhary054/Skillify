/**
 * Authentication utility functions for token management
 */

// Store the authentication token in localStorage
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('skillify_token', token);
    }
  };
  
  // Remove the authentication token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem('skillify_token');
  };
  
  // Get the current authentication token from localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('skillify_token');
  };
  
  // Check if user is authenticated (has a token)
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  // Parse JWT token to get user information
  export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  
  // Check if token is expired
  export const isTokenExpired = (token) => {
    if (!token) return true;
    
    const decoded = parseJwt(token);
    if (!decoded) return true;
    
    // Check if exp field exists and if the token is expired
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };
  
  // Get authenticated user data from token
  export const getUserFromToken = () => {
    const token = getAuthToken();
    if (!token) return null;
    
    const decoded = parseJwt(token);
    return decoded;
  };