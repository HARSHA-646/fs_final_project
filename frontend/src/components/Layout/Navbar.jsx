// src/components/Layout/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main"; // ✅ FIXED PATH
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // IMPORTANT: main.jsx sets axios.defaults.baseURL = `${BACKEND}/api/v1`
      await axios.get("/user/logout", { withCredentials: true });
      toast.success("Logged out successfully!");
      setIsAuthorized(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error?.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          CareerConnect
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/job/getall">Jobs</Link>
          </li>

          {isAuthorized && user?.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post">Post Job</Link>
              </li>
              <li>
                <Link to="/job/me">My Jobs</Link>
              </li>
            </>
          )}

          {isAuthorized && user?.role === "Job Seeker" && (
            <li>
              <Link to="/applications/me">My Applications</Link>
            </li>
          )}
        </ul>

        <div className="nav-auth">
          {isAuthorized ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
