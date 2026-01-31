import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    // ❌ stop if errors
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const loadingToast = toast.loading("Logging in...");
      await login(email, password);
      toast.dismiss(loadingToast);
      toast.success("Login successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">

        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to your Smart Library account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition pointer-cursor"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
