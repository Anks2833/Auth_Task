import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUserCircle } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("User Profile:", response.data);
        } catch (error) {
          console.error(
            "Error fetching profile:",
            error.response?.data || error.message
          );
        }
      };

      fetchUserProfile();
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownVisible(false);
    navigate("/");
  };

  return (
    <div className="w-full absolute top-0 z-[100] h-[10vh] flex justify-between px-40 py-12">
      <NavLink
        to="/"
        className="w-fit text-slate-300 text-3xl flex items-center gap-2 cursor-pointer"
      >
        <div className="w-fit text-white">
          <SiAuth0 />
        </div>
        <h1 className="text-lg text-white font-bold">AUTH TASK</h1>
      </NavLink>

      <div className="flex items-center gap-8 text-lg relative">
        {user ? (
          <div className="relative">
            <div
              className="w-10 h-10 border rounded-full overflow-hidden cursor-pointer"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              {user.profilePic ? (
                <img
                  className="w-full h-full object-cover object-center"
                  src={user.profilePic}
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-white" />
              )}
            </div>

            {dropdownVisible && (
              <div className="w-[18vw] absolute top-12 right-0 bg-zinc-200 text-black shadow-lg rounded-md">
                <div className="flex items-center gap-2 px-6 py-2 border-b">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover object-center" />
                  </div>
                  <h1>{user.firstName} {user.lastName}</h1>
                </div>

                <button
                  className="px-6 py-2 hover:bg-gray-300 hover:rounded-bl-md hover:rounded-br-md w-full flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <div className="text-xl"><IoIosLogOut /></div>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="w-fit text-white flex items-center gap-2 cursor-pointer hover:underline"
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;