import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registration Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join CollabAI
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="font-medium">
              Full Name
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">

              <User size={18} className="text-gray-400" />

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full p-3 outline-none"
                value={formData.fullName}
                onChange={handleChange}
              />

            </div>
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">

              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                value={formData.email}
                onChange={handleChange}
              />

            </div>
          </div>

          <div>

            <label className="font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3">

              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-cyan-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}