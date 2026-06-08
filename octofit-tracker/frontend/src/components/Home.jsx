import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src={heroImg} alt="OctoFit" style={{ maxWidth: '200px', marginBottom: '20px' }} />
        </div>
        <div className="col-md-6">
          <h1>🏃 Welcome to OctoFit Tracker</h1>
          <p className="lead">
            Track your fitness activities, compete on leaderboards, and achieve your fitness goals!
          </p>
          <div className="mt-4">
            <p><strong>Features:</strong></p>
            <ul>
              <li>👥 User profiles and management</li>
              <li>👨‍👩‍👧 Team creation and collaboration</li>
              <li>📊 Activity logging and tracking</li>
              <li>🏆 Competitive leaderboards</li>
              <li>💪 Personalized workout suggestions</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link to="/users" className="btn btn-primary me-2">Get Started</Link>
            <Link to="/leaderboard" className="btn btn-outline-primary">View Leaderboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
