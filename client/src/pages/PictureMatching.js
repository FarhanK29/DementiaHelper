// src/components/PictureMatching.js

import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './PictureMatching.css'; // Ensure you import your CSS file

const PictureMatching = () => {
  const [pictures, setPictures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDescription, setUserDescription] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Fetch 5 random pictures from the API
    const fetchPictures = async () => {
      try {
        const response = await axios.get('/api/random-pictures/'); // Replace with your actual API endpoint
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current picture's description
    const currentPictureDescription = pictures[currentIndex].description;

    try {
      // Make a call to the similarity API
      const response = await axios.post('/api/similarity/', {
        sentence1: userDescription,
        sentence2: currentPictureDescription,
      });

      // Update the similarity score
      setSimilarityScore(response.data.result);
      setIsSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error('Error submitting description:', error);
    }
  };



  const handleNext = () => {
    // Move to the next picture
    if (currentIndex < pictures.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserDescription(''); // Reset user description
      setSimilarityScore(null); // Reset the similarity score
      setIsSubmitted(false); // Reset the submission state
    } else {
      setCompletionMessage('You have completed the picture matching exercise!');
    }
  };

  return (
    <div className="picture-matching-container"> {/* Adjusted className */}
      {completionMessage ? (
        <h2 className="completion-message">{completionMessage}</h2>
      ) : (
        <>
          {pictures.length > 0 && currentIndex < pictures.length && (
            <div className="picture-card">
              <h1 className="title">Picture Matching</h1>
              <img
                src={pictures[currentIndex].image_url}
                alt={pictures[currentIndex].description}
                className="picture-image"
              />
              <form className="description-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  placeholder="Describe this picture"
                  required
                  className="description-input"
                />
                <button type="submit" className="submit-button">Submit</button>
              </form>
              {isSubmitted && (
                <div className="similarity-score">
                  Similarity Score: {similarityScore.toFixed(2)}%
                </div>
              )}
              {isSubmitted && (
                <button onClick={handleNext} className="next-button">
                  Next
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PictureMatching;
