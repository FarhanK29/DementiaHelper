// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
// import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './components/SignUp';
// import { useAuth0 } from "@auth0/auth0-react";

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
