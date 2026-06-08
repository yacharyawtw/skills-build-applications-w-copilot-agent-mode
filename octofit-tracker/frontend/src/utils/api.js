/**
 * API Configuration and utility functions
 * 
 * Environment Configuration:
 * - VITE_CODESPACE_NAME: Required for Codespaces deployments
 *   Set in .env.local: VITE_CODESPACE_NAME=your-codespace-name
 *   When set: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/
 *   When unset: http://localhost:8000/api/ (local development)
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Generic fetch wrapper with error handling
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Ensure data is an array (handles both paginated responses and direct arrays)
 */
export const ensureArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && data.results && Array.isArray(data.results)) {
    return data.results;
  }
  if (data && data.data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
};
