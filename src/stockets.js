import socketIO from "socket.io";

const setupSocket = (server) => {
  const io = socketIO(server);

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;

    // When a user is added
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, { socketId: socket.id, isConnected: true });
      console.log(userId);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      const timestamp = new Date().toISOString(); // Get current date and time

      if (sendUserSocket) {
        socket.to(sendUserSocket.socketId).emit("msg-recieve", {
          msg: data.msg,
          timestamp,
        });
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, userInfo] of onlineUsers.entries()) {
        if (userInfo.socketId === socket.id) {
          onlineUsers.set(userId, { ...userInfo, isConnected: false });
          break;
        }
      }
    });
  });

  return io;
};

export default setupSocket;
