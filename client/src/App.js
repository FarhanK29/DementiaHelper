// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';

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
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/picture-matching" element={<PictureMatching />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
