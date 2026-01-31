import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BorrowProvider } from "./context/BorrowContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <BorrowProvider>
      <App />
    </BorrowProvider>
    </AuthProvider>
);
