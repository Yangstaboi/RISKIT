import React, { useState, useEffect } from "react";
import "../cssstyling/MinesweeperGame.css";

interface MinesweeperGameProps {
  onHomeClick: () => void;
  updatePlayerMoney: (amount: number) => void;
  playerMoney: number;
}

const MinesweeperGame: React.FC<MinesweeperGameProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney,
}) => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [mineCount, setMineCount] = useState<number>(1);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [profit, setProfit] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const gridSize = 5;

  useEffect(() => {
    initializeGrid();
  }, []);

  const calculateOdds = () => {
    return mineCount / (gridSize * gridSize);
  };

  const initializeGrid = () => {
    setGrid(
      Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(null))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (betAmount > playerMoney) {
      alert("Not enough funds");
      return;
    }
    updatePlayerMoney(-betAmount);
    initializeGrid();
    setProfit(0);
    setGameStarted(true);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted) {
      alert("Please start the game by placing a bet.");
      return;
    }

    const newGrid = grid.slice();
    const isMine = Math.random() < calculateOdds();
    if (isMine) {
      alert("Boom! You hit a mine.");
      setGameStarted(false);
      updatePlayerMoney(-betAmount);
      initializeGrid();
    } else {
      const payout = betAmount * calculateOdds();
      setProfit(profit + payout);
      newGrid[rowIndex][colIndex] = "coin";
    }

    setGrid(newGrid);
  };

  const handleCashOut = () => {
    updatePlayerMoney(betAmount + profit);
    setGameStarted(false);
    initializeGrid();
  };

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
    <div className="minesweeper-container">
      <div className="top-container">
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
        <div className="player-wallet">
          <span className="wallet-icon">🪙</span>
          <span>${playerMoney}</span>
        </div>
      </div>
      <form className="betting-form" onSubmit={handleSubmit}>
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

      {/* Minesweeper Grid */}
      <div className="minesweeper-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${cell ? "coin-cell" : ""}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === "coin" ? "🪙" : ""}
            </div>
          ))
        )}
      </div>

      {/* Profit and Cashout */}
      {gameStarted && (
        <div className="profit-display">
          Profit: ${profit.toFixed(2)}
          <button onClick={handleCashOut} className="cashout-button">
            Cashout
          </button>
        </div>
      )}
    </div>
  );
};

export default MinesweeperGame;
