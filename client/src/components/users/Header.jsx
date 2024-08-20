import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../users/UserContext.jsx';
import './Header.css'; // Assurez-vous que ce fichier contient les styles nécessaires

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 sticky-top">
      <Link className="navbar-brand text-info" to="/">Home Page</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {user && (
            <li className="nav-item active">
              <Link className="nav-link" to={`/profile/${user.id}`}>
                Your Profile <span className="sr-only">(current)</span>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/Templates">Templates</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Features">Features</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog">Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/applications">
              <i className="fas fa-folder"></i> {/* Icon for applications */}
              Applications
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/user-list">
              <i className="fas fa-users"></i> {/* Icon for user list */}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;