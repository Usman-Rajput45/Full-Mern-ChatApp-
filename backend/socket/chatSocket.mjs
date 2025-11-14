// // export default function chatSocket(io) {
// //   io.on("connection", (socket) => {
// //     console.log("A user connected:", socket.id);

// //     //User join a room

// //     socket.on("join room", (roomName) => {
// //      socket.join(roomName);
// //      console.log(`User ${socket.id} joined room ${roomName}`)
// // });


// //     // Listen for chat messages
// //     socket.on("chatMessage", (msg) => {
// //       console.log("Message:", msg);
// //       io.emit("chatMessage", msg);
// //     });

// //     // Handle disconnect
// //     socket.on("disconnect", () => {
// //       console.log("A user disconnected:", socket.id);
// //     });
// //   });
// // }




// //This lower one code is for multiple rooms

// // export default function chatSocket(io) {
// //   io.on("connection", (socket) => {
// //     console.log("A user connected:", socket.id);

// //     //  Room join event
// //     socket.on("joinRoom", (roomName) => {
// //       socket.join(roomName);
// //       console.log(`User ${socket.id} joined room: ${roomName}`);
// //     });

// //     //  Chat message event
// //     socket.on("chatMessage", (msg) => {
// //       console.log("Message received:", msg);
// //       // Emit message to users in that specific room only
// //       io.to(msg.room).emit("chatMessage", msg);
// //     });

// //     //  Disconnect event
// //     socket.on("disconnect", () => {
// //       console.log("A user disconnected:", socket.id);
// //     });
// //   });
// // }




// // yeh mera code compatible hai 



// export default function chatSocket(io) {
//   const users = {}; // user list store karne ke liye

//   io.on("connection", (socket) => {
//     console.log("✅ User connected:", socket.id);

//     socket.on("joinRoom", ({ room, username }) => {
//       socket.join(room);
//       users[socket.id] = { username, room };
//       console.log(`👤 ${username} joined ${room}`);
//       io.to(room).emit("userList", Object.values(users).filter(u => u.room === room));
//     });

//     socket.on("chatMessage", (msg) => {
//       console.log("💬 Message received:", msg);
//       io.to(msg.room).emit("chatMessage", {
//         username: msg.username,
//         message: msg.message,
//       });
//     });

//     socket.on("disconnect", () => {
//       const user = users[socket.id];
//       if (user) {
//         console.log(`❌ ${user.username} left`);
//         const room = user.room;
//         delete users[socket.id];
//         io.to(room).emit("userList", Object.values(users).filter(u => u.room === room));
//       }
//     });
//   });
// }
 




// import Message from "../models/message.mjs";

// export default function chatSocket(io) {
//   const users = {};

//   io.on("connection", (socket) => {
//     console.log("✅ User connected:", socket.id);

//     socket.on("joinRoom", async ({ room, username }) => {
//       socket.join(room);
//       users[socket.id] = { username, room };
//       console.log(`👤 ${username} joined ${room}`);

//       // Send old chat history from DB
//       const oldMessages = await Message.find({ room }).sort({ createdAt: 1 });
//       socket.emit("chatHistory", oldMessages);

//       io.to(room).emit(
//         "userList",
//         Object.values(users).filter((u) => u.room === room)
//       );
//     });

//     socket.on("chatMessage", async (msg) => {
//       console.log("💬 Message received:", msg);

//       // Save message in DB
//       const newMessage = new Message({
//         username: msg.username,
//         room: msg.room,
//         message: msg.message,
//       });
//       await newMessage.save();

//       // Send message to everyone in room
//       io.to(msg.room).emit("chatMessage", {
//         username: msg.username,
//         message: msg.message,
//       });
//     });

//     socket.on("disconnect", () => {
//       const user = users[socket.id];
//       if (user) {
//         console.log(`❌ ${user.username} left`);
//         const room = user.room;
//         delete users[socket.id];
//         io.to(room).emit(
//           "userList",
//           Object.values(users).filter((u) => u.room === room)
//         );
//       }
//     });
//   });
// }












// import Message from "../models/message.mjs";

// export default function chatSocket(io) {
//   const users = {};

//   io.on("connection", (socket) => {
//     console.log("✅ User connected:", socket.id);

//     // 🔹 Username validation before joining
//     socket.on("joinRoom", async ({ room, username }) => {
//       if (!username || username.trim() === "") {
//         socket.emit("usernameRequired");
//         return;
//       }

//       socket.join(room);
//       users[socket.id] = { username, room };
//       console.log(`👤 ${username} joined ${room}`);

//       // Send old chat history
//       const oldMessages = await Message.find({ room }).sort({ createdAt: 1 });
//       socket.emit("chatHistory", oldMessages);

//       // Update user list
//       io.to(room).emit(
//         "userList",
//         Object.values(users).filter((u) => u.room === room)
//       );
//     });

//     // 🔹 Typing indicator
//     socket.on("typing", ({ room, username, isTyping }) => {
//       socket.to(room).emit("userTyping", { username, isTyping });
//     });

//     // 🔹 Chat message handling
//     socket.on("chatMessage", async (msg) => {
//       console.log("💬 Message received:", msg);

//       // Save message in DB with timestamp
//       const newMessage = new Message({
//         username: msg.username,
//         room: msg.room,
//         message: msg.message,
//         createdAt: new Date(),
//       });
//       await newMessage.save();

//       io.to(msg.room).emit("chatMessage", {
//         username: msg.username,
//         message: msg.message,
//         createdAt: newMessage.createdAt,
//       });
//     });

//     // 🔹 Delete all chat messages (manual clear)
//     socket.on("clearChat", async ({ room }) => {
//       await Message.deleteMany({ room });
//       io.to(room).emit("chatCleared");
//       console.log(`🗑️ Chat cleared for room: ${room}`);
//     });

//     // 🔹 Disconnect
//     socket.on("disconnect", () => {
//       const user = users[socket.id];
//       if (user) {
//         console.log(`❌ ${user.username} left`);
//         const room = user.room;
//         delete users[socket.id];
//         io.to(room).emit(
//           "userList",
//           Object.values(users).filter((u) => u.room === room)
//         );
//       }
//     });
//   });
// }










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
