// src/components/Navbar.js
import React from "react";
import { useNavigate} from "react-router-dom";
import "./Navbar.css";
import "../static/styles/backbutton.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav>
      <div className = "navbar">
        <button className="back-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;