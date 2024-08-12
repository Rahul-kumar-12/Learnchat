import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`border my-2 rounded-md ${isSelected ? "bg-gray-200" : ""
        }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3  cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://as1.ftcdn.net/v2/jpg/04/86/92/64/1000_F_486926432_nTajrw7kw3ZojWPuw8KYtALliA9srHGe.jpg" />
          </div>
        </div>
        <div>
          <h1 className=" font-bold text-black">{user.fullname}</h1>
          <span className=" font-bold text-black">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
