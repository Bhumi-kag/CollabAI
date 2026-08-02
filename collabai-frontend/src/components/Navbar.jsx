import {
  Bell,
  Search,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { getProfile } from "../services/profileService";

export default function Navbar() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

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
    <header className="h-20 bg-white shadow-md border-b border-gray-200 px-8 flex justify-between items-center">

      {/* Search */}

      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[420px]">

        <Search size={20} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search tasks, workspaces..."
          className="ml-3 w-full bg-transparent outline-none text-gray-700"
        />

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-6">

        <button className="relative p-3 rounded-full hover:bg-gray-100 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">

            <UserCircle
              size={36}
              className="text-cyan-600"
            />

          </div>

          <div>

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
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}