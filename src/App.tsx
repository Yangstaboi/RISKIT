import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="app-container">
      {!isMenuVisible ? (
        <div className="centered-content">
          <button
            className="riskit-button"
            onClick={() => setIsMenuVisible(true)}
          >
            Click to RISKIT
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
