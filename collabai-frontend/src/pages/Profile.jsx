import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Save,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

export default function Profile() {

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

    } finally {

      setLoading(false);

    }

  };

  const handleUpdate = async () => {

    try {

      setSaving(true);

      const updated = await updateProfile({
        fullName: profile.fullName,
      });

      setProfile(updated);

      toast.success("Profile updated successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Failed to update profile.");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );

  }

  return (

    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">

            {profile.fullName
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}

          </div>

          <h1 className="mt-5 text-3xl font-bold">
            My Profile
          </h1>

        </div>

        <div className="mt-10 space-y-6">

          <div>

            <label className="font-semibold mb-2 block">
              Full Name
            </label>

            <div className="relative">

              <User
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />

              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fullName: e.target.value,
                  })
                }
                className="w-full border rounded-xl pl-11 pr-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold mb-2 block">
              Email
            </label>

            <div className="relative">

              <Mail
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border rounded-xl pl-11 pr-4 py-3 bg-gray-100"
              />

            </div>

          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl transition"
          >

            <Save size={20} />

            {saving
              ? "Saving..."
              : "Update Profile"}

          </button>

        </div>

      </div>

    </div>

  );
}