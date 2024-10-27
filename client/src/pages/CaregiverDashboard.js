import React, { useState } from "react";
import "./CaregiverDashboard.css";
import { FaSearch, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Graph from "../components/graph"

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

  const handleDeleteReminder = (index) => {
    setReminders(reminders.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    const remindersText = reminders.map((reminder) => reminder.text).filter(Boolean);
    alert(`Reminders for ${selectedUser} on ${date}: ${remindersText.join(", ")}`);
  };



  return (
    <div className="caregiver-dashboard">

        <Navbar className = "caregiver-navbar" />
    
        <div className="container">
            <h1 className = "caregiver-h1">Caregiver Dashboard</h1>

            {/* User Search Section */}
            <div className="section user-search">
                <h2 className = "caregiver-h2">Select Patient</h2>
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

        
            <div className="section">
                <h2>Assign Reminders</h2>
                {reminders.map((reminder, index) => (
                <div key={reminder.id} className="reminder-item">
                    <input
                        type="text"
                        value={reminder.text}
                        onChange={(e) => handleReminderChange(index, e.target.value)}
                        placeholder={`Reminder ${index + 1}`}
                        className="reminder-input"
                    />
                    <button
                        className="delete-button"
                        onClick={() => handleDeleteReminder(index)}
                        >
                        <FaTrash />
                    </button>
                </div>
                ))}
                <button className="add-reminder-button" onClick={handleAddReminder}>
                + Add Another Reminder
                </button>
            </div>

       
            <div className="section">
                <h2>Select Date</h2>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

        
            <button className="submit-button" onClick={handleSubmit}>
            Submit Reminders
            </button>

        
            <div className="section graph">
                <h2>Activity Graph</h2>
                <Graph></Graph>
            </div>
        </div>
    </div>
  );
};

export default CaregiverDashboard;
