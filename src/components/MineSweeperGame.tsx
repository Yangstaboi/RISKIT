import React, { useState } from "react";
import "../cssstyling/MinesweeperGame.css";
import "../CssStyling/TopContainer.css";

interface MinesweeperGameProps {
  onHomeClick: () => void;
  playerMoney: number; // Assuming you are passing this as a prop
}

const MinesweeperGame: React.FC<MinesweeperGameProps> = ({
  onHomeClick,
  playerMoney,
}) => {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [mineCount, setMineCount] = useState<number>(1);
  const gridSize = 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Bet Amount: ${betAmount}, Mine Count: ${mineCount}`);
  };

  return (
    <div className="minesweeper-container">
      <div className="top-container">
        <div className="home-button" onClick={onHomeClick}>
          Home
        </div>
        <div className="player-wallet">
          <span className="wallet-icon">🪙</span>{" "}
          <span className="wallet-text">${playerMoney}</span>
        </div>
      </div>
      <div className="betting-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="betAmount">Bet Size:</label>
            <input
              type="number"
              id="betAmount"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value))}
              min="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mineCount">Mines:</label>
            <input
              type="number"
              id="mineCount"
              value={mineCount}
              onChange={(e) => setMineCount(parseInt(e.target.value))}
              min="1"
              max="24"
            />
          </div>
          <button type="submit" className="play-button">
            PLAY
          </button>
        </form>
      </div>
      <div className="minesweeper-grid">
        {Array.from({ length: gridSize * gridSize }).map((_, idx) => (
          <div key={idx} className="grid-cell"></div>
        ))}
      </div>
    </div>
  );
};

export default MinesweeperGame;
