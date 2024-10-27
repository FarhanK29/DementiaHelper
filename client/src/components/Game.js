import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../static/styles/game.css";
import BackButton from './BackButton';

function Game() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const duplicatedCards = [...data, ...data];
        shuffleCards(duplicatedCards);
      });
  }, []);

  const shuffleCards = (cardsToShuffle) => {
    const shuffled = cardsToShuffle.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const flipCard = (cardIndex) => {
    if (lockBoard || cardIndex === firstCard || matchedCards.includes(cardIndex)) return;

    if (firstCard === null) {
      setFirstCard(cardIndex);
    } else {
      setSecondCard(cardIndex);
      setScore((prevScore) => prevScore + 1);
      setLockBoard(true);
      checkForMatch(cardIndex);
    }
  };

  const checkForMatch = (secondCardIndex) => {
    const isMatch = cards[firstCard].name === cards[secondCardIndex].name;

    if (isMatch) {
      setMatchedCards((prev) => [...prev, firstCard, secondCardIndex]);
      resetBoard();
    } else {
      unflipCards();
    }
  };

  const unflipCards = () => {
    setTimeout(() => {
      resetBoard();
    }, 1000);
  };

  const resetBoard = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const restart = () => {
    setScore(0);
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setMatchedCards([]);
    shuffleCards(cards);
    setGameCompleted(false); // Reset the game completion state
    updateScore();
  };

  const updateScore = async () => {
    const username = localStorage.getItem('username'); // Get the username from local storage
    if (username) {
        const scoreValue = score > 0 ? Math.floor(9 / score) : 0; // Calculate the score value, avoiding division by zero
        console.log(username, scoreValue); // Log username and scoreValue for debugging
        try {
            await axios.post(`http://127.0.0.1:8000/api/update-score/${username}/`, {
                username: username,
                score_type: 'score1',
                score_value: scoreValue,
            });
            console.log('Score updated successfully.');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    } else {
        console.error('No username found in local storage.');
    }
};

  const checkGameCompletion = () => {
    if (matchedCards.length === cards.length) {
      setGameCompleted(true);
      updateScore(); // Update score when the game is completed
    }
  };

  useEffect(() => {
    checkGameCompletion(); // Check if the game is complete on every render
  }, [matchedCards]); // Depend on matchedCards

  return (
    <div className="game-container">
      <BackButton />
      <h1 className="game">Memory Cards</h1>
      <div className="grid-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${index === firstCard || index === secondCard || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
            data-name={card.name}
          >
            <div className="front">
              <img className="front-image" src={card.image} alt={card.name} />
            </div>
            <div className="back"></div>
          </div>
        ))}
      </div>
      <p>Score: <span className="score">{score}</span></p>
      <div className="actions">
        <button onClick={restart}>Restart</button>
      </div>
      {gameCompleted && <p className="completion-message">Congratulations! You've completed the game!</p>}
    </div>
  );
}

export default Game;
