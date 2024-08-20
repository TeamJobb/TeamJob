const { Message } = require('../models/messageModel.js'); // Adjust the import based on your models

const sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  try {
    // Ensure the user ID is available in req.user (assuming authentication middleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const message = await Message.create({
      recipientId,
      content,
      senderId: req.user.id, // Use authenticated user ID
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
};
