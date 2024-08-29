// controllers/messageController.js
const Message = require("../models/Modelmsg.js");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const Messages = await Message.findAll({
      where: {
        from: [from, to],
        to: [from, to],
      },
      order: [['updatedAt', 'ASC']],
    });

    const projectedMessages = Messages.map((msg) => {
      return {
        fromSelf: msg.from === from,
        message: msg.text,
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, Message: text } = req.body; 
    const data = await Message.create({
      text, 
      from,
      to,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

