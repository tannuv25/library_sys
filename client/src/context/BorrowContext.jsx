import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const BorrowContext = createContext();

export function BorrowProvider({ children }) {
  const { user } = useAuth();   // 🔥 important

  const [activeBorrow, setActiveBorrow] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- ACTIVE BORROW ---------------- */
  const fetchActiveBorrow = async () => {
    try {
      const res = await api.get("/api/borrow/active");
      setActiveBorrow(res.data);
    } catch {
      setActiveBorrow(null);
    }
  };

  /* ---------------- BORROW HISTORY ---------------- */
  const fetchBorrowHistory = async () => {
    try {
      const res = await api.get("/api/borrow/history");
      setHistory(res.data);
    } catch {
      setHistory([]);
    }
  };

  /* ---------------- BORROW BOOK ---------------- */
  const borrowBook = async (bookId, days) => {
    try {
      setLoading(true);
      await api.post("/api/borrow/borrow", { bookId, days });
      toast.success("Book borrowed successfully");
      await fetchActiveBorrow();
    } catch (err) {
      toast.error(err.response?.data?.message || "Borrow failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RETURN BOOK ---------------- */
  const returnBook = async (borrowId) => {
    try {
      setLoading(true);
      await api.post("/api/borrow/return", { borrowId });
      toast.success("Book returned successfully");
      await fetchActiveBorrow();
      await fetchBorrowHistory();
    } catch (err) {
      toast.error(err.response?.data?.message || "Return failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 IMPORTANT FIX
  useEffect(() => {
    if (!user) return;   // 🚀 only run when logged in

    fetchActiveBorrow();
    fetchBorrowHistory();
  }, [user]);

  return (
    <BorrowContext.Provider
      value={{
        activeBorrow,
        history,
        loading,
        borrowBook,
        returnBook,
      }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export const useBorrow = () => useContext(BorrowContext);
