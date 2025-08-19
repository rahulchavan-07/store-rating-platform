import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ import Link
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/axios";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;

      if (!token) throw new Error("Login failed: token not found");

      // Save token in localStorage
      localStorage.setItem("token", token);

      
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);

      // Redirect based on role
      if (payload.role === "ADMIN") navigate("/admin/dashboard");
      else if (payload.role === "OWNER") navigate("/owner/dashboard");
      else if (payload.role === "USER") navigate("/stores");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
