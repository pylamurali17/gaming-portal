import './navbar.css';

function PublicNavbar({ onChangeView }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Gaming Portal</span>

        <button
          className="nav-link"
          onClick={() => onChangeView('home')}
        >
          Home
        </button>

        <button
          className="nav-link"
          onClick={() => onChangeView('tournaments')}
        >
          Tournaments
        </button>

        <button
          className="nav-link"
          onClick={() => onChangeView('about')}
        >
          About Us
        </button>
      </div>

      <div className="navbar-right">
        <button
          className="nav-ghost-btn"
          onClick={() => onChangeView('login')}
        >
          Login
        </button>
        <button
          className="nav-primary-btn"
          onClick={() => onChangeView('register')}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default PublicNavbar;
