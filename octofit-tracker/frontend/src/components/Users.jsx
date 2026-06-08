import { useState, useEffect } from 'react';
import { apiCall, ensureArray } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/users/');
        setUsers(ensureArray(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="spinner-border">Loading...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.profile.firstName} {user.profile.lastName}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}<br />
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Points:</strong> {user.totalActivityPoints}
                </p>
                {user.profile.bio && <p className="card-text"><small>{user.profile.bio}</small></p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
