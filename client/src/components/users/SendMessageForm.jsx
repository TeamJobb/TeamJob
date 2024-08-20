import React, { useState } from 'react';

const SendMessageForm = ({ users, onSendMessage }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (recipient && message) {
      onSendMessage(recipient, message);
      setRecipient('');
      setMessage('');
    }
  };

  return (
    <div className="send-message-form">
      <h3>Send Message</h3>
      <select
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="form-control"
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="form-control"
        placeholder="Type your message here"
      />
      <button onClick={handleSendMessage} className="btn btn-primary mt-2">Send</button>
    </div>
  );
};

export default SendMessageForm;
