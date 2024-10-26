// src/Home.js
import React from 'react';
import dog from "../data/dog.png"
import "./pictureMatching.css"

function PictureMatching() {
  return (
    <div>
      <h1>Picture Matching</h1>
      <div className = "images-div">
        <img src = {dog} ></img>
      </div>
      <div className = "picture-matching-box">
        <textarea></textarea>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default PictureMatching;
