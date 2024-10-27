// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';
import ProtectedRoute from "./ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
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
        <Routes>
          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path="/game" element={<ProtectedRoute> <Game /> </ProtectedRoute>} />
          <Route path="/picture-matching" element={<PictureMatching />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
