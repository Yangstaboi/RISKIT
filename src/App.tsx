import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  function menuHandler() {
    setClicked(true);
    setTimeout(() => {
      if (isMenuVisible === false) {
        setIsMenuVisible(true);
      } else {
        setIsMenuVisible(false);
      }
      setClicked(false);
    }, 600);
  }

  return (
    <div className="app-container">
      {!isMenuVisible ? (
        <div className="centered-content">
          <button
            className={`riskit-button ${clicked ? 'riskit-button-clicked' : ''}`}
            onClick={() => menuHandler()}
          >
            <span className="riskit-button-text">Click to RISKIT</span>
          </button>
        </div>
      ) : (
        <div className="menu-container">
          <div className="top-center-button">
            <button
              className="game-button"
              onClick={() => setIsMenuVisible(false)}
            >
              Return to Start
            </button>
          </div>

          <h1>Welcome to RISKIT</h1>
          <div className="game-selection">
            <button className="game-button">Minesweeper</button>
            <button className="game-button">Roulette</button>
            <button className="game-button">RISKIT</button>
            <button className="game-button">Poker</button>
            <button className="game-button">BlackJack</button>
            <button className="game-button">Bacarat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
