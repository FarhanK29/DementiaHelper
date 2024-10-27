import React, { useState } from "react";
import "./CaregiverDashboard.css";
import { FaSearch } from "react-icons/fa";

const CaregiverDashboard = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reminders, setReminders] = useState([{ id: Date.now(), text: "" }]);

  const handleAddReminder = () => {
    setReminders([...reminders, { id: Date.now(), text: "" }]);
  };

  const handleReminderChange = (index, value) => {
    const updatedReminders = reminders.map((reminder, idx) =>
      idx === index ? { ...reminder, text: value } : reminder
    );
    setReminders(updatedReminders);
  };

  const handleSubmit = () => {
    const remindersText = reminders.map((reminder) => reminder.text).filter(Boolean);
    alert(`Reminders for ${selectedUser} on ${date}: ${remindersText.join(", ")}`);
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

        {/* Reminders Section */}
        <div className="section">
          <h2>Assign Reminders</h2>
          {reminders.map((reminder, index) => (
            <input
              key={reminder.id}
              type="text"
              value={reminder.text}
              onChange={(e) => handleReminderChange(index, e.target.value)}
              placeholder={`Reminder ${index + 1}`}
              className="reminder-input"
            />
          ))}
          <button className="add-reminder-button" onClick={handleAddReminder}>
            + Add Another Reminder
          </button>
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
          Submit Reminders
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
