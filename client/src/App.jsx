import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import BorrowPage from "./pages/BorrowPage";
import Transactions from "./pages/Transaction";
import BorrowHistory from "./pages/BorrowHistory";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "80px",
          },
        }}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED - ANY LOGGED IN USER */}
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* USER ONLY ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrow"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BorrowPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/borrow-history"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BorrowHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY ROUTES */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-books"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout>
        <AdminBooks />
      </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
