import React, { useContext, useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../users/UserContext.jsx';
import axios from 'axios';
import './Header.css'; 

const Header = () => {
  const { user } = useContext(UserContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:3020/api/messages/unread');
          setUnreadCount(response.data.count);
        } catch (error) {
          console.error('Error fetching unread message count:', error);
        }
      }
    };

    fetchUnreadCount();
  }, [user]);

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
            <Link className="nav-link" to="/blog">Blog</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to={`/user/${user.id}/applications`}>
                <i className="fas fa-folder"></i> 
                Applications
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/user-list">
              <i className="fas fa-users"></i> 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/messages">
              <FaEnvelope />
              {unreadCount > 0 && (
                <span className="badge bg-danger ms-1">{unreadCount}</span>
              )}
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
