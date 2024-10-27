// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './components/Game';
// import Signup from './pages/Signup';
import PictureMatching from './pages/PictureMatching';
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CaregiverDashboard from './pages/CaregiverDashboard';


function App() {
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
