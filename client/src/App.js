// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
import PictureMatching from './pages/PictureMatching';
import { AuthenticationGuard } from "./components/authentication-guard";

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

          <Route path = "/callback" element = {<Home />} />
          <Route path="/" element={ <AuthenticationGuard component = {Home} />} />
          <Route path="/game" element={<Game  />} />
          <Route path="/picture-matching" element={<PictureMatching /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
