import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// set global axios defaults so every component uses same base URL
import axios from "axios";

const BACKEND =
  import.meta?.env?.VITE_API_URL || process.env.REACT_APP_BACKEND_URL || "";

axios.defaults.baseURL = BACKEND;       // e.g. https://fsfinalproject-production.up.railway.app
axios.defaults.withCredentials = true;  // send cookies on cross-site requests

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

