// src/main.jsx
import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

const BACKEND = import.meta.env.VITE_API_URL || "https://fsfinalproject-production.up.railway.app";
const trimmed = BACKEND.replace(/\/+$/, "");

// <<< FIX: do NOT append /api/v1 here (Option A) >>>
axios.defaults.baseURL = "https://fsfinalproject-production.up.railway.app";
axios.defaults.withCredentials = true;
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

