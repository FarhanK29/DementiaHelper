import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from '../axios';
import './PictureMatching.css'; // Ensure you import your CSS file

const FamilyMatching = () => {
  const [pictures, setPictures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDescription, setUserDescription] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0); // State to hold the score

  useEffect(() => {
    // Fetch 5 random pictures from the API
    const fetchPictures = async () => {
      try {
        const response = await axios.get('/api/family/'); // Replace with your actual API endpoint
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPictureDescription = pictures[currentIndex].description;
    
    // Compare user description with API description (case insensitive)
    if (userDescription.trim().toLowerCase() === currentPictureDescription.trim().toLowerCase()) {
      setScore(prevScore => prevScore + 1); // Increment score if matched
    }

    setIsSubmitted(true); // Mark as submitted
  };

  const handleNext = async () => {
    // Move to the next picture
    if (currentIndex < pictures.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserDescription(''); // Reset user description
      setIsSubmitted(false); // Reset the submission state
    } else {
      // Game is complete
      setCompletionMessage('You have completed the picture matching exercise!');

      const username = localStorage.getItem('username');
      // Update score in the API only when the game is over
      if (username) {
        try {
          await axios.post(`/api/update-score/${username}/`, {
            username: username, // Replace with the actual user ID if necessary
            score_type: 'score3', // Use score_type as score3
            score_value: score, // Send the score
          });
        } catch (error) {
          console.error('Error updating score:', error);
        }
      }
    }
  };

  return (
    <div className="picture-matching-container"> {/* Adjusted className */}
      <BackButton />
      {completionMessage ? (
        <h2 className="completion-message">{completionMessage}</h2>
      ) : (
        <>
          {pictures.length > 0 && currentIndex < pictures.length && (
            <div className="picture-card">
              <h1 className="title">Family Matching</h1>
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
                  placeholder="Identify the person in this picture"
                  required
                  className="description-input"
                />
                <button type="submit" className="submit-button">Submit</button>
              </form>
              {isSubmitted && (
                <div className="score-message">
                  {userDescription.trim().toLowerCase() === pictures[currentIndex].description.trim().toLowerCase() 
                    ? `Correct! Your current score: ${score}`
                    : `Incorrect! The correct description was: ${pictures[currentIndex].description}.`}
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

export default FamilyMatching;
