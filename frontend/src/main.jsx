import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// set global axios defaults so every component uses same base URL
import axios from "axios";

const BACKEND = import.meta.env.VITE_API_URL || "https://fsfinalproject-production.up.railway.app";
// ensure no trailing slash
const trimmed = BACKEND.replace(/\/+$/, "");
// Option 1: If your request paths include "/api/v1/..."
axios.defaults.baseURL = trimmed;
axios.defaults.withCredentials = true;
  // send cookies on cross-site requests

// add these near the top of src/main.jsx

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

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


