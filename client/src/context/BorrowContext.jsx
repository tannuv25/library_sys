import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const BorrowContext = createContext();

export function BorrowProvider({ children }) {
  const [activeBorrow, setActiveBorrow] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- ACTIVE BORROW ---------------- */
  const fetchActiveBorrow = async () => {
    try {
      const res = await api.get("/api/borrow/active");
      setActiveBorrow(res.data);
    } catch (err) {
      setActiveBorrow(null);
    }
  };

  /* ---------------- BORROW HISTORY ---------------- */
  const fetchBorrowHistory = async () => {
    try {
      const res = await api.get("/api/borrow/history");
      setHistory(res.data);
    } catch (err) {
      setHistory([]);
    }
  };

  /* ---------------- BORROW BOOK ---------------- */
  const borrowBook = async (bookId, days) => {
    try {
      setLoading(true);
      await api.post("/api/borrow", { bookId, days });
      toast.success("Book borrowed successfully");
      fetchActiveBorrow();
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
      fetchActiveBorrow();
      fetchBorrowHistory();
    } catch (err) {
      toast.error(err.response?.data?.message || "Return failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveBorrow();
    fetchBorrowHistory();
  }, []);

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
