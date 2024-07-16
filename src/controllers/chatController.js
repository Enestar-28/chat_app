import Connection from "../db/config.js";
const connection = await Connection();

let chatController = {
  // Method to get all messages
  getMessages: async (req, res) => {
    const { conversationId, userId } = req.body;

    try {
      // Get all messages from the database for the given conversationId
      const [rows] = await connection.execute(
        "SELECT * FROM Messages WHERE conversation_id = ?",
        [conversationId]
      );

      // Project the messages into the desired format
      const projectedMessages = rows.map((msg) => {
        // Chuyển đổi thời gian từ UTC sang múi giờ Việt Nam
        const utcTime = new Date(msg.sent_at);
        const vietnamTime = new Date(utcTime.setHours(utcTime.getHours() + 7));

        return {
          fromSelf: msg.sender_id === userId,
          message: msg.message_text,
          sentAt: vietnamTime.toISOString(),
        };
      });

      // Return the projected messages
      return res.json(projectedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  },

  // Method to send a message
  sendMessage: async (req, res) => {
    // Get the message data from the request body
    const { senderId, receiverId, message_text, conversationId } = req.body;

    try {
      // Check if the conversation with conversationId exists
      const [isConversations] = await connection.execute(
        "SELECT * FROM Conversations WHERE conversation_id = ?",
        [conversationId]
      );

      if (isConversations.length === 0) {
        const craeteConversation = await connection.execute(
          "INSERT INTO Conversations (conversation_id, conversation_name ) VALUES (?, ?)",
          [conversationId, "New Conversation"]
        );

        // Conversation does not exist, create a new conversation
        const [insertedConversation] = await connection.execute(
          "INSERT INTO User_Conversations (conversation_id, user_id) VALUES (?, ?)",
          [conversationId, senderId]
        );
        await connection.execute(
          "INSERT INTO User_Conversations (conversation_id, user_id) VALUES (?, ?)",
          [conversationId, receiverId]
        );
      }

      // Insert the message into the database
      await connection.execute(
        "INSERT INTO Messages (sender_id, message_text, conversation_id) VALUES (?, ?, ?)",
        [senderId, message_text, conversationId]
      );

      // Return a success message
      return res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
  },
};

export default chatController;
