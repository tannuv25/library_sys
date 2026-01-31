import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load profile on refresh
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/auth/profile");
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchProfile();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // SIGNUP
  const signup = async (name, email, password) => {
    const res = await api.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshProfile: fetchProfile, // 🔥 exposed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
