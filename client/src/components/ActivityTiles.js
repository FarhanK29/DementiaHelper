// src/ActivityTiles.js
import React from 'react';
import "../static/styles/activities.css";
import { Link } from 'react-router-dom';


function ActivityTiles() {
  return (
    <div className="activity-tiles-container">
      <Link to="/game" className="tile game-tile">
        <h2>Memory Game</h2>
      </Link>
      <Link to="/picture-matching" className="tile future-tile">
        <h2>Picture Matching</h2>
      </Link>
    </div>
  );
}

export default ActivityTiles;