// src/main.jsx
import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// src/main.jsx (replace the existing BACKEND/axios defaults part with this)
import axios from "axios";

const BACKEND = import.meta.env.VITE_API_URL || "https://fsfinalproject-production.up.railway.app";

// Normalize and ensure the base URL **ends with /api/v1**
let trimmed = BACKEND.replace(/\/+$/, "");            // remove trailing slash(es)
if (!/\/api\/v1$/i.test(trimmed)) trimmed = trimmed + "/api/v1";

console.log("SET AXIOS baseURL ->", trimmed);       // debug line you can remove later
axios.defaults.baseURL = trimmed;                    // e.g. https://...railway.app/api/v1
axios.defaults.withCredentials = true;               // send cookies on cross-site requests


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

