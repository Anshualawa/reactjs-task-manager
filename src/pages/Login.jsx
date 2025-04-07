import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../api";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuthToken } = useAuth();  // Renamed for clarity
  const navigate = useNavigate();  // Initialize navigate
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      setAuthToken(res)
      toast.success("Login successful! You can now in.");
      navigate("/");  // Redirect to Dashboard after successful login
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Task Manager Login
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
