// src/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import '../static/styles/redirectubtton.css'; // Ensure you have the CSS file for styling

function BackButton() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  return (
    <button className="back-button" onClick={() => navigate("/caregiver")}> {/* Navigate back */}
      Caregiver Dashboard
    </button>
  );
}


export default BackButton;
