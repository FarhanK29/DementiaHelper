// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
// import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './components/SignUp';
import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";

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
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li><Link to = "/signup">Signup</Link></li>
            <li>
              <Link to="/picture-matching">Picture Matching</Link>
            </li>
          </ul>
        </nav> */}
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={ <Home /> } />
          <Route path="/game" element={<ProtectedRoute> <Game /> </ProtectedRoute>} />
          <Route path="/picture-matching" element={<PictureMatching />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
