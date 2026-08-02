import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import { getProfile } from "../services/profileService";

export default function Profile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-5">

            <User
              size={55}
              className="text-blue-600"
            />

          </div>

          <h1 className="text-3xl font-bold">
            {profile.fullName}
          </h1>

          <div className="flex items-center gap-2 text-gray-600 mt-4">

            <Mail size={20} />

            <span>{profile.email}</span>

          </div>

        </div>

      </div>

    </div>
  );
}