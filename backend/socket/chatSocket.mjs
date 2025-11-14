



import Message from "../models/message.mjs";

export default function chatSocket(io) {
  const users = {};

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // 🔹 Join Room (with username validation)
    socket.on("joinRoom", async ({ room, username }) => {
      if (!username || username.trim() === "") {
        socket.emit("usernameRequired");
        return;
      }

      socket.join(room);
      users[socket.id] = { username, room };
      console.log(`👤 ${username} joined ${room}`);

      // Send old chat history from DB
      const oldMessages = await Message.find({ room }).sort({ createdAt: 1 });
      socket.emit("chatHistory", oldMessages);

      // Update user list for that room
      io.to(room).emit(
        "userList",
        Object.values(users).filter((u) => u.room === room)
      );
    });

    // 🔹 Typing Indicator
    socket.on("typing", ({ room, username, isTyping }) => {
      socket.to(room).emit("userTyping", { username, isTyping });
    });

    // 🔹 Message Handling (Save to DB + Broadcast)
    socket.on("chatMessage", async (msg) => {
      const newMessage = new Message({
        username: msg.username,
        room: msg.room,
        message: msg.message,
        createdAt: new Date(),
      });
      await newMessage.save();

      io.to(msg.room).emit("chatMessage", {
        username: msg.username,
        message: msg.message,
        createdAt: newMessage.createdAt,
      });
    });

    // ✅ Clear chat only for the requesting user (does NOT delete from DB)
    socket.on("clearChat", ({ room }) => {
      socket.emit("chatCleared");
      console.log(`🧹 ${users[socket.id]?.username || "User"} cleared local chat in room: ${room}`);
    });

    // 🔹 Disconnect user & update room list
    socket.on("disconnect", () => {
      const user = users[socket.id];
      if (user) {
        console.log(`❌ ${user.username} left`);
        const room = user.room;
        delete users[socket.id];
        io.to(room).emit(
          "userList",
          Object.values(users).filter((u) => u.room === room)
        );
      }
    });
  });
}
