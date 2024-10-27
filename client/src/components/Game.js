// src/Game.js
import React, { useEffect, useState } from 'react';
import "../static/styles/game.css";
import BackButton from './BackButton'; // Import the BackButton

function Game() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [score, setScore] = useState(0);
  const [matchedCards, setMatchedCards] = useState([]);

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
  };

  return (
    <div className="game-container">
      <BackButton />
      <h1 class="game">Memory Cards</h1>
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
    </div>
  );
}

export default Game;
