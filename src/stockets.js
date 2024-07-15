import socketIO from "socket.io";

const setupSocket = (server) => {
  const io = socketIO(server);

  const socketsConnected = new Set();

  let clientsCount = 0;
  let users = ["nguyen", "hai", "nhugn"];

  io.on("connection", (socket) => {
    clientsCount++;
    users.push({ id: socket.id, name: "anonymous" }); // Default name is anonymous
    io.emit("clients-total", clientsCount);
    io.emit("users-list", users);

    socket.on("disconnect", () => {
      clientsCount--;
      users = users.filter((user) => user.id !== socket.id);
      io.emit("clients-total", clientsCount);
      io.emit("users-list", users);
    });

    socket.on("message", (message) => {
      io.emit("chat-message", message);
    });

    socket.on("name-change", (name) => {
      const user = users.find((user) => user.id === socket.id);
      if (user) {
        user.name = name;
        io.emit("users-list", users);
      }
    });
  });

  return io;
};

export default setupSocket;
