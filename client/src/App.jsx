import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import BorrowPage from "./pages/BorrowPage";
import Transactions from "./pages/Transaction";
import BorrowHistory from "./pages/BorrowHistory";


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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/borrow" element={<BorrowPage />} />
        <Route path="/borrow-history" element={<BorrowHistory />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
