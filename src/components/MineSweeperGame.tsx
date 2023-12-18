import React, { useState } from "react";
import "../cssstyling/MinesweeperGame.css";

const MinesweeperGame: React.FC = () => {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [mineCount, setMineCount] = useState<number>(1);
  const gridSize = 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your bet submission logic here
    console.log(`Bet Amount: ${betAmount}, Mine Count: ${mineCount}`);
  };

  return (
    <div className="minesweeper-container">
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
          <div key={idx} className="grid-cell">
            {/* Grid cell content goes here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinesweeperGame;
