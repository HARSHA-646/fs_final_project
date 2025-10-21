// src/main.jsx
import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

/**
 * NOTE:
 * - Keep VITE_API_URL in .env as: VITE_API_URL=https://your-backend.example.com
 * - This code trims trailing slashes, then appends /api/v1 so component endpoints can use short paths like "/user/login".
 */

// read backend base from env (fallback provided)
const BACKEND = import.meta.env.VITE_API_URL || "https://fsfinalproject-production.up.railway.app";
// trim any trailing slashes
const trimmed = BACKEND.replace(/\/+$/, "");

// === Centralized axios defaults ===
// Set baseURL to trimmed + '/api/v1' so components call endpoints like "/user/login"
axios.defaults.baseURL = `${trimmed}/api/v1`;
// If your backend uses cookies/sessions, keep withCredentials true
axios.defaults.withCredentials = true;
// Common accept header (optional)
axios.defaults.headers.common["Accept"] = "application/json";

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: null,
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
