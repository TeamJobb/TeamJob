import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import testImage from '../../assets/male-placeholder.jpg'; 
import './UserList.css'; 

const UserList = ({ users, selectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.length) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:3022/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [users]);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (user.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Users Overview</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by name or job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="card user-card mx-2 my-3 shadow-sm">
                <img
                  src={user.image ? user.image : testImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="card-img-top rounded-circle user-image"
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-primary">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="card-text">
                    <FaEnvelope className="icon-color" /> {user.email}
                  </p>
                  <p className="card-text">
                    <FaBriefcase className="icon-color" />{' '}
                    <small className="text-muted">{user.job_title}</small>
                  </p>
                  <p className="card-text">
                    <FaMapMarkerAlt className="icon-color" />{' '}
                    <small className="text-muted">{user.location}</small>
                  </p>
                  <button
                    className="btn btn-primary btn-block mb-2"
                    onClick={() => handleViewProfile(user.id)}
                  >
                    View Profile
                  </button>
                  <button
                    className="btn btn-outline-primary btn-block"
                    onClick={() => selectUser(user)}
                  >
                    Message
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
