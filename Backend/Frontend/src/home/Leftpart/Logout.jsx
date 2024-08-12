import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <hr />
      <div className="h-[20]">
        <div>
          <input
            type="submit"
            value="Logout"
            onClick={handleLogout}
            className="text-white bg-black text-white font-medium px-4 py-2 mt-4 px-2 py-1 cursor-pointer rounded-lg"
          />


        </div>
      </div>
    </>
  );
}

export default Logout;
