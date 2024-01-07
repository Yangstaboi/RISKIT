import React, { useState, useEffect, useRef } from "react";
import "../cssstyling/MinesweeperGame.css";

interface MinesweeperGameProps {
  onHomeClick: () => void;
  updatePlayerMoney: (userId: string, amount: number) => void;
  playerMoney: number;
  userId: string;
}

const MinesweeperGame: React.FC<MinesweeperGameProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney,
  userId,
}) => {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [mineCount, setMineCount] = useState<number>(1);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [profit, setProfit] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gridSize, setGridSize] = useState<number>(25);
  const [freeSpaces, setFreeSpaces] = useState<number>(24);
  const [successfulClicks, setSuccessfulClicks] = useState<number>(0);
  const originalFreeSpacesRef = useRef<number>(24);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [flippingCell, setFlippingCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const gridNum = 5;

  useEffect(() => {
    initializeGrid();
  }, []);

  const calculateCumulativeOdds = (clickedCells: number) => {
    let odds = 1;
    let tempGridSize = 25;
    let originalFreeSpaces = originalFreeSpacesRef.current;
    for (let i = 0; i < clickedCells; i++) {
      odds *= (originalFreeSpaces - i) / (tempGridSize - i);
      odds = parseFloat(odds.toFixed(2));
    }
    return odds;
  };

  const revealGrid = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell === "mine") {
          return "revealed-mine";
        } else if (!cell) {
          return "revealed-coin";
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  useEffect(() => {
    let cumulativeOdds = calculateCumulativeOdds(successfulClicks);
    let oddsMultiplier = 1 / cumulativeOdds;
    let potentialProfit = betAmount * oddsMultiplier;
    let currentPayout = potentialProfit - betAmount;

    setProfit(currentPayout);
  }, [successfulClicks, freeSpaces, gridSize, betAmount]);

  const initializeGrid = () => {
    let newGrid = Array(gridNum)
      .fill(null)
      .map(() => Array(gridNum).fill(null));
    placeMines(newGrid, mineCount);
    setGrid(newGrid);
    setGridSize(25);
    setFreeSpaces(25 - mineCount);
    originalFreeSpacesRef.current = 25 - mineCount;
    setSuccessfulClicks(0);
    setGameOver(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (betAmount > playerMoney) {
      alert("Not enough funds");
      return;
    }
    initializeGrid();
    setProfit(0);
    setGameStarted(true);
  };

  const placeMines = (grid: (string | null)[][], mineCount: number) => {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const rowIndex = Math.floor(Math.random() * gridNum);
      const colIndex = Math.floor(Math.random() * gridNum);

      if (grid[rowIndex][colIndex] !== "mine") {
        grid[rowIndex][colIndex] = "mine";

        minesPlaced++;
      }
    }
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted) {
      alert("Please start the game by placing a bet.");
      return;
    }

    const newGrid = [...grid.map((row) => [...row])];
    const cell = newGrid[rowIndex][colIndex];
    setFlippingCell({ row: rowIndex, col: colIndex });
    if (cell === "mine") {
      setTimeout(() => setFlippingCell(null), 300);
      console.log("Before hitting mine:", playerMoney);
      setGameStarted(false);
      updatePlayerMoney(userId, -betAmount);
      console.log("After hitting mine:", playerMoney);
      setGameOver(true);
      revealGrid();
    } else if (cell === "clicked" || cell === "coin") {
      return;
    } else {
      setSuccessfulClicks(successfulClicks + 1);
      setFreeSpaces(freeSpaces - 1);
      setGridSize(gridSize - 1);

      newGrid[rowIndex][colIndex] = "coin";
      setGrid(newGrid);
    }
    setTimeout(() => setFlippingCell(null), 300);
    setGrid(newGrid);
  };

  const handleCashOut = () => {
    updatePlayerMoney(userId, profit);
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
          <span>${playerMoney.toFixed(2)}</span>
        </div>
      </div>
      <form className="betting-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="betAmount">Bet Size:</label>
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            placeholder="1"
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
            min="1"
            max={playerMoney > 0 ? playerMoney : Infinity} // Set to Infinity or remove max if you do not want to limit the input
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
        {gameStarted && !gameOver && (
          <div className="profit-and-cashout">
            <div className="profit-display">Profit: ${profit.toFixed(2)}</div>
            <button onClick={handleCashOut} className="cashout-button">
              Cashout
            </button>
          </div>
        )}
      </form>

      {/* Minesweeper Grid */}
      <div className="minesweeper-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`grid-cell ${cell === "coin" ? "coin-cell" : ""} ${
                gameOver && cell === "mine" ? "mine-cell" : ""
              } ${gameOver && !cell ? "revealed-coin" : ""} ${
                flippingCell &&
                flippingCell.row === rowIndex &&
                flippingCell.col === colIndex
                  ? "flipping"
                  : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {/* Display coin icon for cells that are coins or revealed coins */}
              {(cell === "coin" || (gameOver && !cell)) && (
                <span className="coin-icon">🪙</span>
              )}
              {/* Display mine icon for cells that are revealed mines */}
              {gameOver && cell === "mine" && (
                <span className="mine-icon">💣</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MinesweeperGame;
