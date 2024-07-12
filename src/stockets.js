import socketIO from "socket.io";

const setupSocket = (server) => {
  const io = socketIO(server);

  const socketsConnected = new Set();
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socketsConnected.add(socket.id);
    io.emit("clients-total", socketsConnected.size);

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
      socketsConnected.delete(socket.id);
      io.emit("clients-total", socketsConnected.size);
    });

      socket.on("message", (data) => {
        console.log(data);
      socket.broadcast.emit("chat-message", data);
    });

    socket.on("feedback", (data) => {
      socket.broadcast.emit("feedback", data);
    });
  });
  return io;
};

export default setupSocket;
