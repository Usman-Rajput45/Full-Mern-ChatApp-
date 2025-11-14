



import React from "react";

export default function UserList({ users }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Online Users</h2>
      <ul className="space-y-1">
        {users.map((user, index) => (
          <li key={index} className="text-gray-700">
            👤 {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}





