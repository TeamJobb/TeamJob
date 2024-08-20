import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import testImage from '../../assets/user-profile default.png'; 
import './UserList.css'; 


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3020/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleSendMessage = async (recipientId) => {
    try {
      await axios.post('http://localhost:3020/api/messages', {
        recipientId,
        message
      });
      setMessage('');
      setShowMessageForm(false);
      // Trigger notification update in navbar or handle accordingly
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleMessageButtonClick = (user) => {
    setSelectedUser(user);
    setShowMessageForm(true);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    const firstName = user.firstName ? user.firstName.toLowerCase() : '';
    const lastName = user.lastName ? user.lastName.toLowerCase() : '';
    const jobTitle = user.job_title ? user.job_title.toLowerCase() : '';

    return (
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      jobTitle.includes(searchLower)
    );
  });

  return (
    <div className="user-list-container">
      <h2 className="text-center text-white mb-4">Users List</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by name or job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="d-flex flex-wrap justify-content-start">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className="card user-card mx-2 my-3">
              <img
                 src={user.image ? user.image : testImage}
                alt={`${user.firstName} ${user.lastName}`}
                className="card-img-top rounded-circle mx-auto mt-3"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{user.firstName} {user.lastName}</h5>
                <p className="card-text">
                  <FaEnvelope className="icon-color" /> {user.email}
                </p>
                <p className="card-text">
                  <FaBriefcase className="icon-color" /> <small className="text-muted">{user.job_title}</small>
                </p>
                <p className="card-text">
                  <FaMapMarkerAlt className="icon-color" /> <small className="text-muted">{user.location}</small>
                </p>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => handleViewProfile(user.id)}
                >
                  View Profile
                </button>
                <button
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => handleMessageButtonClick(user)}
                >
                  Send Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No users found.</p>
        )}
      </div>

      {showMessageForm && selectedUser && (
        <div className="message-form">
          <h4>Send Message to {selectedUser.firstName} {selectedUser.lastName}</h4>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          ></textarea>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleSendMessage(selectedUser.id)}
          >
            Send
          </button>
          <button
            className="btn btn-secondary mt-2 ms-2"
            onClick={() => setShowMessageForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
