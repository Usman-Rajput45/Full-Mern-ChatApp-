// import React from "react";

// function UserList({ users }) {
//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-bold mb-2">Users</h3>
//       <ul>
//         {users.map((u, i) => (
//           <li key={i} className="p-1">
//             {u.username} {u.isTyping && <span className="text-sm italic">typing...</span>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserList;




// import React from "react";

// export default function UserList({ users }) {
//   return (
//     <div className="mt-4">
//       <h2 className="text-lg font-semibold mb-2">Online Users</h2>
//       <ul className="space-y-1">
//         {users.map((user, index) => (
//           <li key={index} className="text-gray-700">
//             👤 {user}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




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





