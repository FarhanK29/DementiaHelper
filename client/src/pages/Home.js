// src/Home.js (or your main page component)

import React from 'react';
import ActivityTiles from '../components/ActivityTiles';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Welcome to Cognify</h1>
      <ActivityTiles />
    </div>
  );
}

export default Home;
