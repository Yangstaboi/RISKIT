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
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(2);
  const [winChance, setWinChance] = useState<number>(50);

  useEffect(() => {
    const winChance = 100 - sliderValue;
    const multiplier = winChance > 0 ? 1 / (winChance / 100) : 0;

    setWinChance(winChance);
    setMultiplier(multiplier);
  }, [sliderValue]);

  const handleHomeClick = () => {
    if (gameStarted) {
      const confirm = window.confirm(
        "Are you sure you want to return home? This will end the current game."
      );
      if (!confirm) return;
    }
    onHomeClick();
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
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
            value={sliderValue}
            onChange={handleSliderChange}
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
