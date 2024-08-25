import React from 'react';

const MessageThread = ({ messages }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Message Thread</h5>
      </div>
      <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.length > 0 ? (
          messages.map(msg => (
            <div key={msg.id} className={`mb-3 ${msg.isSent ? 'text-end' : 'text-start'}`}>
              <div className={`p-2 rounded ${msg.isSent ? 'bg-primary text-white' : 'bg-light'}`}>
                <p className="mb-0">{msg.message}</p>
                <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageThread;
