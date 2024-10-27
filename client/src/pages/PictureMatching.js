import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from '../axios';
import './PictureMatching.css'; // Ensure you import your CSS file

const PictureMatching = () => {
  const [pictures, setPictures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDescription, setUserDescription] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [similarityScore, setSimilarityScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0); // State to hold total score

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
    const username = localStorage.getItem('username');

    // Get the current picture's description
    const currentPictureDescription = pictures[currentIndex].description;
    if (username) {
      try {
        // Make a call to the similarity API
        const response = await axios.post('/api/similarity/', {
          sentence1: userDescription,
          sentence2: currentPictureDescription,
        });

        // Update the similarity score
        const similarity = response.data.result;
        setSimilarityScore(similarity);
        setTotalScore(prevScore => prevScore + similarity); // Update total score
        setIsSubmitted(true); // Mark as submitted
      } catch (error) {
        console.error('Error submitting description:', error);
      }
    }
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
            score_type: 'score2', // Use the similarity score to update score2
            score_value: totalScore/5, // Send the total score
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
