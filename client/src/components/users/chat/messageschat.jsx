import React from 'react';
import './messageChat.css'; // Assurez-vous d'ajouter ce fichier CSS

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      time: '2024-08-24 10:15',
      content: 'Hello! How are you?',
    },
    {
      id: 2,
      sender: 'Jane Smith',
      time: '2024-08-24 10:30',
      content: 'Hi! Just checking in.',
    },
    // Ajoutez plus de messages ici
  ];

  return (
    <div className="messages-container">
      <div className="header">
        <h2>Messages</h2>
      </div>
      <div className="messages-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="sender">{message.sender}</span>
              <span className="time">{message.time}</span>
            </div>
            <div className="message-body">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="reply-section">
        <textarea placeholder="Type your message here..." rows="4"></textarea>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default MessagesPage;
