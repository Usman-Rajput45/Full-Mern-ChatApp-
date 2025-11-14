import React, { useEffect, useRef } from "react";

function MessageList({ messages }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((m, i) => (
        <div key={i} className="mb-2">
          <strong className="text-blue-600">{m.username || "Anonymous"}:</strong>{" "}
          <span>{m.message}</span>
        </div>
      ))}
      <div ref={ref}></div>
    </div>
  );
}

export default MessageList;
