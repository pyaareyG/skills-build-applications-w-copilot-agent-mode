import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import logo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navigationItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="bg-body-tertiary min-vh-100">
      <div className="container py-4 py-lg-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-4 mb-4">
              <img className="app-logo" src={logo} alt="Octofit Tracker" />
              <div className="text-start">
                <p className="text-uppercase text-muted fw-semibold small mb-2">Octofit Tracker</p>
                <h1 className="h2 mb-2">Presentation tier dashboard</h1>
                <p className="text-muted mb-0">
                  Browse users, activities, teams, leaderboard, and workouts through the
                  Express API.
                </p>
              </div>
            </div>

            <div className="alert alert-info mb-4" role="alert">
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when you want
              the frontend to call the Codespaces-hosted API. Otherwise it safely falls back to
              <code> http://localhost:8000</code>.
            </div>

            <nav className="nav nav-pills flex-column flex-sm-row gap-2 mb-4">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) =>
                    `nav-link rounded-pill px-3 ${isActive ? 'active' : 'text-body'}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="/users" element={<Users />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
