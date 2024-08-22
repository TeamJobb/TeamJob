import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList'; // Composant pour sélectionner un utilisateur
import MessageThread from './MessageThread'; // Composant pour afficher le fil de messages

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:3020/api/messages/${selectedUser.id}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (selectedUser && message) {
      try {
        await axios.post('http://localhost:3020/api/messages', {
          recipientId: selectedUser.id,
          message
        });
        setMessage('');
        const response = await axios.get(`http://localhost:3020/api/messages/${User.id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <UserList onSelectUser={setSelectedUser} />
        </div>
        <div className="col-md-8">
          {selectedUser && (
            <>
              <MessageThread messages={messages} />
              <div className="mt-3">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
