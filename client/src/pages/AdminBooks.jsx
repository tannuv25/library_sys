import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  BookOpen,
  Plus,
  Trash2,
  Pencil,
  IndianRupee,
  Search
} from "lucide-react";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pricePerDay: "",
    totalCopies: "",
    image: "",
  });

  /* ---------------- FETCH ---------------- */
  const fetchBooks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/books/admin", {
        params: { page, limit, search }
      });

      setBooks(res.data.books);
      setTotalPages(res.data.pages);

    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, limit, search]);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- ADD BOOK ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/books", {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        totalCopies: Number(formData.totalCopies),
      });

      toast.success("Book added successfully");
      setFormData({
        title: "",
        author: "",
        pricePerDay: "",
        totalCopies: "",
        image: "",
      });

      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding book");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/books/${id}`);
      toast.success("Book deleted");
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot delete");
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-600" />
          <h1 className="text-2xl font-bold">Manage Books</h1>
        </div>

        {/* SEARCH */}
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="ml-2 outline-none text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Price</th>
              <th className="p-4">Total</th>
              <th className="p-4">Available</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{book.title}</td>
                <td className="p-4">{book.author}</td>
                <td className="p-4 flex items-center gap-1">
                  <IndianRupee size={14} />
                  {book.pricePerDay}
                </td>
                <td className="p-4">{book.totalCopies}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      book.availableCopies > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.availableCopies}
                  </span>
                </td>
                <td className="p-4 text-center space-x-3">
                  <button className="text-indigo-600">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <div>
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
