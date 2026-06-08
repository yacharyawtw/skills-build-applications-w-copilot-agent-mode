/**
 * API utility helpers
 * 
 * Components construct their own endpoint URLs using import.meta.env.VITE_CODESPACE_NAME
 * Example:
 *   const API_URL = import.meta.env.VITE_CODESPACE_NAME
 *     ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
 *     : 'http://localhost:8000/api/activities';
 */

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
