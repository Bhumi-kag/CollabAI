import {
  Bell,
  Search,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { getProfile } from "../services/userService";

import {
  getNotifications,
  getUnreadCount,
} from "../services/notificationService";

import NotificationDropdown from "./NotificationDropdown";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {

    loadProfile();
    loadNotifications();

    // Auto refresh notifications every 10 seconds
    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const loadProfile = async () => {

    try {

      const data = await getProfile();

      setProfile(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadNotifications = async () => {

    try {

      const notificationData =
        await getNotifications();

      setNotifications(notificationData);

      const count =
        await getUnreadCount();

      setUnreadCount(count);

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

      {/* Left */}

      <div className="flex items-center gap-3">

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="lg:hidden"
        >
          <Menu size={28} />
        </button>

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

      {/* Right */}

      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notifications */}

        <div
          className="relative"
          ref={dropdownRef}
        >

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative p-2 sm:p-3 rounded-full hover:bg-gray-100 transition"
          >

            <Bell size={22} />

            {unreadCount > 0 && (

              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold px-1">

                {unreadCount}

              </span>

            )}

          </button>

          {showNotifications && (

            <NotificationDropdown
              notifications={notifications}
              setNotifications={setNotifications}
              onRefresh={loadNotifications}
            />

          )}

        </div>

        {/* User */}

        <button
          onClick={() =>
            navigate("/profile")
          }
          className="flex items-center gap-2 hover:bg-gray-100 rounded-xl px-2 py-1 transition"
        >

          <UserCircle
            size={38}
            className="text-cyan-600"
          />

          <div className="hidden sm:block text-left">

            <h2 className="font-semibold">

              {profile.fullName}

            </h2>

            <p className="text-sm text-gray-500">

              {profile.email}

            </p>

          </div>

        </button>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition"
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