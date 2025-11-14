

import React, { useState } from "react";

export default function ChatBox({ sendMessage, onTyping }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping?.(true);
    setTimeout(() => onTyping?.(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t flex">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
}







