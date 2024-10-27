import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import "./ClientDashboard.css";
import Navbar from '../components/Navbar';

const ClientDashboard = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Take morning medication", completed: false },
    { id: 2, text: "Go for a walk", completed: false },
    { id: 3, text: "Call family member", completed: false },
  ]);

  const [newReminder, setNewReminder] = useState("");

  const handleToggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const handleAddReminder = () => {
    if (newReminder.trim() !== "") {
      setReminders([
        ...reminders,
        { id: Date.now(), text: newReminder, completed: false },
      ]);
      setNewReminder("");
    }
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="client-dashboard">
        <Navbar />
        <Link to  = "/caregiver" className = "caregiver-button-redirect">Caregiver Dashboard</Link>
      <div className="dashboard-header">Welcome to Cognify</div>

      {/* Games Section */}
      <div className="section games-section">
        <div className="section-title">Games</div>
        <div className="games-container">
          <Link to="/picture-matching" className="game-card">
            <div>Picture Matching</div>
          </Link>
          <Link to="/memory-game" className="game-card">
            <div>Memory Game</div>
          </Link>
        </div>
      </div>

      {/* Reminders Section */}
      <div className="section reminders-section">
        <div className="section-title">Reminders</div>
        <ul className="reminders-list">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item">
              <input
                type="checkbox"
                checked={reminder.completed}
                onChange={() => handleToggleReminder(reminder.id)}
              />
              <span className={reminder.completed ? "completed" : ""}>
                {reminder.text}
              </span>
              <AiOutlineDelete
                className="delete-icon"
                onClick={() => handleDeleteReminder(reminder.id)}
              />
            </li>
          ))}
        </ul>

        <div className="add-reminder">
          <input
            type="text"
            placeholder="Add new reminder..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
          />
          <button onClick={handleAddReminder} className="add-button">
            Add Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
