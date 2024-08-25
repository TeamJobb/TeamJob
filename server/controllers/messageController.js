const Message = require('../models/messageModel.js');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch message' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create message' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            await message.update(req.body);
            res.json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update message' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            await message.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
};
