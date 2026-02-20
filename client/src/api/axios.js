import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false, // keep false for now (we're using localStorage)
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or invalid
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

     
    }

    return Promise.reject(error);
  }
);

export default api;
