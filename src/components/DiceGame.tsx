import "../CssStyling/DiceGame.css";
import React, { useState, useEffect } from "react";

interface DiceGameProps {
  onHomeClick: () => void;
  updatePlayerMoney: (userId: string, amount: number) => void;
  playerMoney: number;
  userId: string;
}

const DiceGame: React.FC<DiceGameProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney,
  userId,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(2);
  const [winChance, setWinChance] = useState<number>(50);
  const [betAmount, setBetAmount] = useState<string>("");
  const [profitOnWin, setProfitOnWin] = useState<number>(0);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  useEffect(() => {
    const winChance = 100 - sliderValue;
    const multiplier = winChance > 0 ? 1 / (winChance / 100) : 0;

    setWinChance(winChance);
    setMultiplier(multiplier);
  }, [sliderValue]);

  useEffect(() => {
    const bet = parseFloat(betAmount);
    setProfitOnWin(bet * multiplier);
  }, [betAmount, multiplier]);

  const handleHomeClick = () => {
    onHomeClick();
  };

  const handleBet = () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0) {
      setGameResult("Please enter a valid bet amount.");
      return;
    }
    // Ensure the user has entered a bet amount greater than 0
    if (playerMoney < bet) {
      alert("You don't have enough money to place this bet.");
      return; // Exit the function early
    }
    if (bet <= 0) {
      setGameResult("Please enter a bet amount.");
      return;
    }

    // Generate a random number for the result
    const generatedNumber = Math.floor(Math.random() * 101);
    setRandomNumber(generatedNumber);

    if (sliderValue <= generatedNumber) {
      // User wins, calculate profit
      const profit = bet * multiplier;
      updatePlayerMoney(userId, profit - bet);
      setGameResult(`You won! Number was ${generatedNumber}.`);
    } else {
      // User loses, subtract bet amount
      updatePlayerMoney(userId, -bet);
      setGameResult(`You lost! Number was ${generatedNumber}.`);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // Allow the user to clear the input or type a number
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // This regex allows integers and decimals
      setBetAmount(value);
    }
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
          <input
            type="text" // Change the type to "text"
            id="bet-amount"
            value={betAmount}
            onChange={handleBetAmountChange}
            placeholder="Enter bet amount"
          />
        </div>
        <div className="profit-display">
          <label htmlFor="profit-win">Profit on Win</label>
          <div id="profit-win" className="profit-value">
            ${profitOnWin.toFixed(2)}
          </div>
        </div>
        <button className="bet-button" onClick={handleBet}>
          Bet
        </button>
        {gameResult && <div className="game-result">{gameResult}</div>}
      </div>
      <div className="game-visualization-section">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
            id="bet-slider"
          />
          {randomNumber !== null && (
            <div
              className="random-number-display"
              style={{
                left: `${randomNumber}%`,
                marginLeft: "-12px",
              }}
            >
              {randomNumber}
              <div className="line-indicator" />
            </div>
          )}
          <div className="marks">
            {/* Generate the marks dynamically */}
            {Array.from({ length: 21 }, (_, index) => (
              <span key={index} style={{ left: `${index * 5}%` }}>
                {index * 5}
              </span>
            ))}
          </div>
        </div>

        <div className="bottom-sections">
          <div className="section">
            <div className="section-title">Multiplier</div>
            <div className="section-border">x{multiplier.toFixed(2)}</div>
          </div>
          <div className="section">
            <div className="section-title">Win Chance</div>
            <div className="section-border">{winChance}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;
