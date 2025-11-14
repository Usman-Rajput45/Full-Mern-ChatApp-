






import React, { useState } from "react";

export default function RoomList({ joinRoom, currentRoom }) {
  const [newRoom, setNewRoom] = useState("");

  const handleJoin = () => {
    if (newRoom.trim()) {
      joinRoom(newRoom.trim());
      setNewRoom(""); // clear input
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Rooms</h3>

      <ul>
        {["general", "random"].map((room) => (
          <li
            key={room}
            onClick={() => joinRoom(room)}
            className={`cursor-pointer p-1 rounded ${
              currentRoom === room ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
          >
            {room}
          </li>
        ))}
      </ul>

      {/* 🆕 Create / Join Room Section */}
      <div className="mt-3">
        <input
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="New room"
          className="border p-1 rounded w-full"
        />
        <button
          onClick={handleJoin}
          className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
        >
          Create / Join
        </button>
      </div>
    </div>
  );
}

