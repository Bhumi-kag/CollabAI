import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await loginUser({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-white text-center">
          CollabAI
        </h1>

        <p className="text-gray-300 text-center mt-3">
          Welcome Back 👋
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-8"
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl bg-white/20 border border-white/20 p-3 text-white placeholder-gray-300 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-white/20 border border-white/20 p-3 text-white placeholder-gray-300 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 text-white font-semibold disabled:opacity-60"
          >
            {loading ? (
              <ClipLoader color="white" size={22} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-8">
          Don't have an account?
          <Link
            to="/register"
            className="text-cyan-300 ml-2 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}