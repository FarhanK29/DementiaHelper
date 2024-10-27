import React, { useState } from "react";
import "./CaregiverDashboard.css";
import { FaSearch } from "react-icons/fa"; // Optional icon for search input

const CaregiverDashboard = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [reminder, setReminder] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = () => {
    alert(`Reminder for ${selectedUser} on ${date}: ${reminder}`);
  };

  return (
    <div className="caregiver-dashboard">
      <div className="container">
        <h1>Caregiver Dashboard</h1>

        {/* User Search Section */}
        <div className="section user-search">
          <h2>Select Patient</h2>
          <div className="search-container">
            <input
              type="text"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder="Search patient by username"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Reminder Section */}
        <div className="section">
          <h2>Assign Reminder</h2>
          <input
            type="text"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Enter reminder details"
          />
        </div>

        {/* Date Picker */}
        <div className="section">
          <h2>Select Date</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={handleSubmit}>
          Submit Reminder
        </button>

        {/* Graph Placeholder */}
        <div className="section graph">
          <h2>Activity Graph</h2>
          <div className="graph-placeholder">Graph will be displayed here.</div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
