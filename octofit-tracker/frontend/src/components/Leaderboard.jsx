import { useState, useEffect } from 'react';
import { ensureArray } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
          : 'http://localhost:8000/api/leaderboard';
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        setLeaderboard(ensureArray(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="spinner-border">Loading...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry._id}>
                <td>
                  <strong>
                    {entry.rank === 1 && '🥇'}
                    {entry.rank === 2 && '🥈'}
                    {entry.rank === 3 && '🥉'}
                    {entry.rank > 3 && entry.rank}
                  </strong>
                </td>
                <td>{entry.userId?.username || 'Unknown'}</td>
                <td><strong>{entry.totalPoints}</strong></td>
                <td>{entry.activitiesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
