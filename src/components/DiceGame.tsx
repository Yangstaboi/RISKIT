import "../CssStyling/DiceGame.css";
import React, { useState, useEffect, useRef } from "react";

interface DiceGameProps {
  onHomeClick: () => void;
  updatePlayerMoney: (amount: number) => void;
  playerMoney: number;
}

const DiceGame: React.FC<DiceGameProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney,
}) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleHomeClick = () => {
    if (gameStarted) {
      const confirm = window.confirm(
        "Are you sure you want to return home? This will end the current game."
      );
      if (!confirm) return;
    }
    onHomeClick();
  };

  return (
    <div className="dice-game-container">
      <div className="top-container">
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
        <div className="player-wallet">
          <span className="wallet-icon">🪙</span>
          <span>${playerMoney.toFixed(2)}</span>
        </div>
      </div>
      <div className="betting-section">
        <div className="input-group">
          <label htmlFor="bet-amount">Bet Amount</label>
          <input type="number" id="bet-amount" placeholder="Enter bet amount" />
        </div>
        <div className="input-group">
          <label htmlFor="profit-win">Profit on Win</label>
          <input
            type="number"
            id="profit-win"
            placeholder="Potential profit"
            disabled
          />
        </div>
        <button className="bet-button">Bet</button>
      </div>
      <div className="game-visualization-section">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            className="slider"
            id="bet-slider"
          />
          <div className="marks">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;
