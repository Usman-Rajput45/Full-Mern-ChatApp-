

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RoomList from "../components/RoomList";
import UserList from "../components/UserList";
import MessageList from "../components/MessageList";
import ChatBox from "../components/ChatBox";

// const socket = io("http://localhost:8000");

const socket = io("https://full-mern-chatapp-production-dae4.up.railway.app/", {
  transports: ["websocket"],
  secure: true,
    withCredentials: true, // ensure only websocket transport
});


function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("general");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    // 🔹 Force username input (cannot skip)
    let name = "";
    while (!name.trim()) {
      name = prompt("Enter your username:");
      if (!name || !name.trim()) alert("⚠️ Username is required!");
    }
    setUsername(name);

    socket.emit("joinRoom", { room: "general", username: name });

    // 🔹 Username missing protection
    socket.on("usernameRequired", () => {
      alert("⚠️ Please enter a valid username to join!");
      window.location.reload();
    });

    // 🔹 Load old chat
    socket.on("chatHistory", (oldMessages) => setMessages(oldMessages));

    // 🔹 Receive new message
    socket.on("chatMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    // 🔹 User list update
    socket.on("userList", (users) => setUsers(users));

    // 🔹 Typing indicator
    socket.on("userTyping", ({ username, isTyping }) => {
      setTypingUser(isTyping ? username : null);
    });

    // 🔹 Chat cleared
    socket.on("chatCleared", () => {
      setMessages([]);
      alert("🗑️ Chat has been cleared!");
    });

    return () => {
      socket.off("chatMessage");
      socket.off("chatHistory");
      socket.off("userList");
      socket.off("userTyping");
      socket.off("chatCleared");
    };
  }, []);

  // 🔹 Send message
  const sendMessage = (text) => {
    if (text.trim() !== "") {
      socket.emit("chatMessage", { message: text, room, username });
    }
  };

  // 🔹 Typing event
  const handleTyping = (isTyping) => {
    socket.emit("typing", { room, username, isTyping });
  };

  // 🔹 Join or create new room
  const joinRoom = (roomName) => {
    setRoom(roomName);
    socket.emit("joinRoom", { room: roomName, username });
  };

  // 🔹 Clear chat manually
  const clearChat = () => {
    if (window.confirm("🗑️ Clear chat?")) {
      socket.emit("clearChat", { room });
    }
  };

  return (
    <div className="flex w-full h-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r p-4 flex flex-col">
        <RoomList joinRoom={joinRoom} currentRoom={room} />
        <UserList users={users} />
        <button
          onClick={clearChat}
          className="mt-3 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold p-2 border-b bg-gray-50">
          Room: {room}
        </h2>
        <MessageList messages={messages} />
        {typingUser && (
          <div className="px-3 text-gray-500 italic text-sm">
            {typingUser} is typing...
          </div>
        )}
        <ChatBox sendMessage={sendMessage} onTyping={handleTyping} />
      </div>
    </div>
  );
}

export default ChatPage;












