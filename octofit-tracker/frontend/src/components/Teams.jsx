import { useState, useEffect } from 'react';
import { apiCall, ensureArray } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/teams/');
        setTeams(ensureArray(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="spinner-border">Loading...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">
                  <strong>Description:</strong> {team.description || 'N/A'}<br />
                  <strong>Total Points:</strong> {team.totalTeamPoints}<br />
                  <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
