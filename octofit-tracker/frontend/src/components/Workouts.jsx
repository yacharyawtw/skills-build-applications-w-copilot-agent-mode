import { useState, useEffect } from 'react';
import { apiCall, ensureArray } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await apiCall('/workouts/');
        setWorkouts(ensureArray(data));
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div className="container mt-4"><div className="spinner-border">Loading...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">
                  <strong>Description:</strong> {workout.description}<br />
                  <strong>Difficulty:</strong> <span className="badge bg-info">{workout.difficultyLevel}</span><br />
                  <strong>Duration:</strong> {workout.estimatedDuration} minutes<br />
                  <strong>Exercises:</strong> {Array.isArray(workout.exercises) ? workout.exercises.length : 0}
                </p>
                {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                  <div className="mt-2">
                    <small><strong>Exercise List:</strong></small>
                    <ul className="small">
                      {workout.exercises.map((ex, idx) => (
                        <li key={idx}>
                          {ex.name}
                          {ex.sets && ` - ${ex.sets} sets`}
                          {ex.reps && ` x ${ex.reps} reps`}
                          {ex.duration && ` - ${ex.duration}m`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
