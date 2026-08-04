import {
  Bell,
  Search,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { getProfile } from "../services/profileService";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-20 bg-white shadow-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex justify-between items-center">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <Menu size={28} />
        </button>

        {/* Search - Desktop Only */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-72 lg:w-[420px]">

          <Search
            size={20}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="ml-3 w-full bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative p-2 sm:p-3 rounded-full hover:bg-gray-100"
          >
            <Bell size={22} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

          </button>

          {showNotifications && (
            <NotificationDropdown />
          )}

        </div>

        {/* User */}
        <div className="flex items-center gap-2">

          <UserCircle
            size={38}
            className="text-cyan-600"
          />

          {/* Hide user details on very small screens */}
          <div className="hidden sm:block">

            <h2 className="font-semibold text-gray-800">
              {profile.fullName}
            </h2>

            <p className="text-sm text-gray-500">
              {profile.email}
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl"
        >
          <LogOut size={18} />

          <span className="hidden sm:inline">
            Logout
          </span>

        </button>

      </div>

    </header>
  );
}