import React, { useEffect, useState } from "react";
import "./CaregiverDashboard.css";
import { FaSearch, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Graph from "../components/graph"; // Ensure your Graph component path is correct
import axios from "axios";

const CaregiverDashboard = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [reminders, setReminders] = useState([{ id: Date.now(), text: "" }]);
  const [userData, setUserData] = useState(null);
  const [scores, setScores] = useState([]); // New state to store scores

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
    const remindersText = reminders
      .map((reminder) => reminder.text)
      .filter(Boolean);
    alert(`Reminders for ${selectedUser} on ${date}: ${remindersText.join(", ")}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${selectedUser}/`);
        setUserData(response.data); // Set the fetched user data in state
        
        // Fetch scores data based on selected user
        const scoresResponse = await axios.get(`http://127.0.0.1:8000/api/update-score/${selectedUser}/`);
        setScores(scoresResponse.data); // Store scores in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (selectedUser) {
      fetchUserData();
    }
  }, [selectedUser]);

  console.log(userData);
  console.log(scores); // Log the scores for debugging

  return (
    <div className="caregiver-dashboard">
      <Navbar className="caregiver-navbar" />
      <div className="container">
        <h1 className="caregiver-h1">Caregiver Dashboard</h1>

        {/* User Search Section */}
        <div className="section user-search">
          <h2 className="caregiver-h2">Select Patient</h2>
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
          <h2 className="caregiver-h2">Assign Reminders</h2>
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
          <h2 className="caregiver-h2">Select Date</h2>
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
          <h2 className="caregiver-h2">Activity Graph</h2>
          <Graph scores={scores} /> {/* Pass scores to Graph component */}
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
