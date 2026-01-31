import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    let newErrors = {};

    // 🔴 Inline validation
    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors below");
      return;
    }

    try {
      const loadingToast = toast.loading("Creating account...");
      await signup(name, email, password);
      toast.dismiss(loadingToast);
      toast.success("Account created successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Signup failed, try again"
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/src/assets/library-bg.svg')",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join Smart Library today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
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
              placeholder="••••••••"
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
