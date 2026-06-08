import { Link } from 'react-router-dom';

export default function Navigation() {
  const API_URL = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🏃 OctoFit Tracker
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teams">Teams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activities">Activities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </li>
          </ul>
        </div>
        <small className="text-muted d-inline ms-3">API: {API_URL}</small>
      </div>
    </nav>
  );
}
