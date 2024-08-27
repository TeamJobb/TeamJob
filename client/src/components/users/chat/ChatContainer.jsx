import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./chat.css";
import robotGif from "../../../assets/robot.gif"; // Chemin correct pour le GIF

const Chat = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:3022");
      socket.current.emit("add-user", currentUser.id);

      socket.current.on("msg-recieve", (msg) => {
        setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
      });

      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && currentUser) {
        try {
          const res = await axios.post("http://localhost:3022/api/messages/getmsg", {
            from: currentUser.id,
            to: selectedUser.id,
          });
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      socket.current.emit("send-msg", {
        to: selectedUser.id,
        from: currentUser.id,
        msg: newMessage,
      });

      try {
        await axios.post("http://localhost:3022/api/messages/addmsg", {
          from: currentUser.id,
          to: selectedUser.id,
          Message: newMessage,
        });

        setMessages((prev) => [...prev, { fromSelf: true, Message: newMessage }]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <img src={robotGif} alt="Chatbot" className="chat-robot-icon" />
        <h3>Chat with {selectedUser?.firstName || "..."}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromSelf ? "sent" : "received"}`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
