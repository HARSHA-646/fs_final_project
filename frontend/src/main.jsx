import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// add these near the top of src/main.jsx
import axios from "axios";

const BACKEND =
  import.meta?.env?.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "";

axios.defaults.baseURL = BACKEND;
axios.defaults.withCredentials = true; // ensures cookies are sent

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
