import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import testImage from '../../assets/male-placeholder.jpg'; 
import './UserList.css'; 

const UserList = ({ users = [], selectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (users.length === 0) {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:3022/api/users');
          setFilteredUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredUsers(users);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      user =>
        user.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.job_title?.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleViewProfile = (userId) => {
    navigate(`/Viewprofile/${userId}`);
  };

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
        <div className="row">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="col-lg-4 col-md-6">
                <div className="card user-card mx-2 my-3 shadow-sm">
                  <img
                    src={user.image || testImage}
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
