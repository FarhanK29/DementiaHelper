// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
// import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CaregiverDashboard from './pages/CaregiverDashboard';
// import Signup from './components/SignUp';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/current-user/', { withCredentials: true });
                setUsername(response.data.username);  // Store the username in state
                localStorage.setItem('username', response.data.username);  // Optionally store in localStorage
            } catch (error) {
                console.error("User not authenticated", error);
            }
        };

        fetchUsername();
    }, []);
  return (
    <Router>
      <div>
       
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={ <Home /> } />
          <Route path = "/caregiver/" element = {<CaregiverDashboard />} />
          <Route path="/game" element={<ProtectedRoute> <Game /> </ProtectedRoute>} />
          <Route path="/picture-matching" element={<PictureMatching />} />
          <Route path="*" element={ <Home /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
