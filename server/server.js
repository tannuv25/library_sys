import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./conifg/db.js";
import seedBooks from "./utils/seedBook.js";
import path from "path";


// // routes (abhi empty honge, baad me add karenge)
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";




dotenv.config();

const app = express();

// ------------------ Middlewares ------------------
app.use(cors());
app.use(express.json()); // body parser

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ------------------ Routes ------------------
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/transactions", transactionRoutes);


// ------------------ Health Check ------------------
app.get("/", (req, res) => {
  res.send("🚀 Smart Library Backend is running");
});

// ------------------ Server + DB ------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await seedBooks();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });

