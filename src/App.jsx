import { useState } from 'react';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import Tournaments from './components/Tournaments';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('home'); // 'home' | 'login' | 'register' | 'tournaments' | 'about'
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [dashboardView, setDashboardView] = useState('dashboard'); // 'dashboard' | 'tournaments' | 'schedules' | 'aboutus'

  // Registered tournaments state (for schedules view)
  const [registered, setRegistered] = useState([]);

  // Quick register handler (used by Tournaments in logged-in mode)
  const handleQuickRegister = (tournament, details) => {
    setRegistered((prev) => [
      ...prev,
      {
        ...tournament,
        ...details,
        registeredAt: new Date().toISOString(),
      },
    ]);
  };

  // Demo credentials (same as original app)
  const DEMO_USER = 'Gnanesh';
  const DEMO_PASS = 'Gnanesh@1561';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (
      loginData.username === DEMO_USER &&
      loginData.password === DEMO_PASS
    ) {
      setIsLoggedIn(true);
      setLoginName(loginData.username);
      setDashboardView('dashboard');
      setLoginData({ username: '', password: '' });
      setView('home');
    } else {
      alert('Invalid username or password!');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Demo registration behavior
    alert('Registration submitted!');
    setView('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginName('');
    setView('home');
    setDashboardView('dashboard');
  };

  // -------------------------
  // PUBLIC (NOT LOGGED IN) UI
  // -------------------------
  if (!isLoggedIn) {
    return (
      <>
        <PublicNavbar onChangeView={setView} />

        {view === 'home' && (
          <div className="home-page">
            <section className="hero-section">
              <div className="hero-grid">
                <div className="hero-left">
                  <p className="hero-pill">🎮 Competitive Gaming Hub</p>
                  <h1 className="hero-title">
                    Find your next
                    <span> Tournament</span>
                  </h1>
                  <p className="hero-subtitle">
                    Discover curated esports tournaments, quick-register in a few clicks,
                    and track your schedules in one modern gaming dashboard.
                  </p>
                  <div className="hero-actions">
                    <button
                      className="primary-btn"
                      onClick={() => setView('register')}
                    >
                      Get Started
                    </button>
                    <button
                      className="outline-btn"
                      onClick={() => setView('tournaments')}
                    >
                      Explore Tournaments
                    </button>
                  </div>
                  <div className="hero-meta">
                    <div>
                      <span className="hero-meta-label">🔥 Live Events</span>
                      <span className="hero-meta-value">Weekly</span>
                    </div>
                    <div>
                      <span className="hero-meta-label">👥 Players</span>
                      <span className="hero-meta-value">Community Focused</span>
                    </div>
                    <div>
                      <span className="hero-meta-label">⚡ Register</span>
                      <span className="hero-meta-value">Under 1 minute</span>
                    </div>
                  </div>
                </div>

                <div className="hero-right">
                  <div className="hero-card">
                    <p className="hero-card-label">Featured Tournament</p>
                    <h2 className="hero-card-title">Valorant Showdown</h2>
                    <p className="hero-card-subtitle">
                      5v5 tactical FPS • Free entry • Live-streamed finals
                    </p>
                    <ul className="hero-card-list">
                      <li>Ranked matchmaking</li>
                      <li>Knockout brackets</li>
                      <li>Shoutcasted grand finals</li>
                    </ul>
                    <button
                      className="secondary-btn"
                      onClick={() => setView('tournaments')}
                    >
                      View All Tournaments
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'tournaments' && (
          <div className="dashboard-page">
            <section className="dashboard-section">
              <h2 className="section-title">Tournaments</h2>
              <p className="section-subtitle">
                Browse tournaments. Login to quickly register and track your schedules.
              </p>
              <div className="public-tournaments-wrapper">
                <Tournaments
                  onQuickRegister={() => {
                    alert('Please login to use Quick Register.');
                  }}
                  onNavigateToSchedules={null}
                />
              </div>
            </section>
          </div>
        )}

        {view === 'about' && (
          <div className="dashboard-page">
            <section className="dashboard-section">
              <h2 className="section-title">About Gaming Portal</h2>
              <p className="section-subtitle">
                Built for gamers who want clean schedules, quick joining,
                and less confusion across multiple tournaments.
              </p>
              <AboutUs />
            </section>
          </div>
        )}

        {view === 'login' && (
          <div className="auth-page">
            <Login
              loginData={loginData}
              setLoginData={setLoginData}
              handleLoginSubmit={handleLoginSubmit}
              setView={setView}
            />
          </div>
        )}

        {view === 'register' && (
          <div className="auth-page">
            <Register
              registerData={registerData}
              setRegisterData={setRegisterData}
              handleRegisterSubmit={handleRegisterSubmit}
              setView={setView}
            />
          </div>
        )}

        <Footer />
      </>
    );
  }

  // -------------------------
  // LOGGED IN DASHBOARD UI
  // -------------------------
  return (
    <>
      <Navbar
        username={loginName}
        onLogout={handleLogout}
        onNavigate={setDashboardView}
      />

      <div className="dashboard-page">
        {dashboardView === 'dashboard' && (
          <section className="dashboard-hero">
            <div className="dashboard-hero-grid">
              <div>
                <p className="hero-pill">Welcome back, {loginName} 👋</p>
                <h1 className="hero-title">
                  Your <span>Gaming Dashboard</span>
                </h1>
                <p className="hero-subtitle">
                  Track registered tournaments, view schedules, and discover new events tailored
                  to your playstyle.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary-btn"
                    onClick={() => setDashboardView('tournaments')}
                  >
                    Browse Tournaments
                  </button>
                  <button
                    className="outline-btn"
                    onClick={() => setDashboardView('schedules')}
                  >
                    View My Schedules
                  </button>
                </div>
              </div>

              <div className="dashboard-stats">
                <div className="stat-card">
                  <span className="stat-label">Registered</span>
                  <span className="stat-value">{registered.length}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Upcoming</span>
                  <span className="stat-value">
                    {registered.length > 0 ? 'Active' : 'None'}
                  </span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">Demo</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {dashboardView === 'tournaments' && (
          <section className="dashboard-section">
            <Tournaments
              onQuickRegister={handleQuickRegister}
              onNavigateToSchedules={() => setDashboardView('schedules')}
            />
          </section>
        )}

        {dashboardView === 'schedules' && (
          <section className="dashboard-section schedules-page">
            <h2 className="section-title">Your Registered Tournaments</h2>
            {registered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎮</div>
                <h3>No tournaments registered yet</h3>
                <p>
                  Use <b>Quick Register</b> on any tournament card to save it here.
                </p>
                <button
                  className="primary-btn"
                  onClick={() => setDashboardView('tournaments')}
                >
                  Browse Tournaments
                </button>
              </div>
            ) : (
              <div className="registered-grid">
                {registered.map((reg, index) => (
                  <div key={index} className="registered-card">
                    <div className="registered-header">
                      <div>
                        <h3>{reg.title}</h3>
                        <p>{reg.subtitle}</p>
                      </div>
                      <span className="registered-badge">REGISTERED</span>
                    </div>
                    <div className="registered-body">
                      <p><strong>Gamer:</strong> {reg.gamerName}</p>
                      <p><strong>Email:</strong> {reg.email}</p>
                      <p><strong>Contact:</strong> {reg.contact}</p>
                      <p><strong>IGN:</strong> {reg.ign}</p>
                      <p><strong>Platform:</strong> {reg.platform}</p>
                      <p><strong>Preferred Slot:</strong> {reg.schedule}</p>
                      {reg.teamName && (
                        <p><strong>Team:</strong> {reg.teamName}</p>
                      )}
                      <p className="registered-time">
                        Registered on:{' '}
                        {new Date(reg.registeredAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {dashboardView === 'aboutus' && (
          <section className="dashboard-section">
            <AboutUs />
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
