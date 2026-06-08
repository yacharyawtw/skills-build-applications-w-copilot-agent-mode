/**
 * API utility functions
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
