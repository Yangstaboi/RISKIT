import React, { useState } from "react";
import PlayerWallet from "./PlayerWallet";
import "../CssStyling/Roulette.css";

interface RouletteProps {
  onHomeClick: () => void;
  updatePlayerMoney: (userId: string, amount: number) => void;
  playerMoney: number;
  userId: string;
}

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const black = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];
const purple = [0];

const Roulette: React.FC<RouletteProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney,
  userId,
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(
    null
  );
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [betColor, setBetColor] = useState<"red" | "black" | "purple" | null>(
    null
  );

  const spinWheel = () => {
    setIsSpinning(true);
    let randomStart = Math.floor(Math.random() * numbers.length);
    let spinCount =
      Math.floor(Math.random() * (numbers.length * 2)) +
      numbers.length * 2 +
      randomStart;
    console.log(
      `Initial spinCount: ${spinCount}, Random Start: ${randomStart}`
    );

    console.log(`Index being accessed: ${spinCount % numbers.length}`);

    const spinInterval = setInterval(() => {
      console.log(`Calculated index: ${spinCount % numbers.length}`);
      let currentNumber = numbers[(spinCount + randomStart) % numbers.length];
      console.log(`Current Number: ${currentNumber}, spinCount: ${spinCount}`);
      setHighlightedNumber(currentNumber);

      if (spinCount-- <= 0) {
        clearInterval(spinInterval);
        finishSpin(currentNumber);
      }
    }, 30);
  };

  const finishSpin = (number: number) => {
    console.log(`Final Spin Number: ${number}`);
    setIsSpinning(false);
    setWinningNumber(number);
    checkWin(number);
  };

  const checkWin = (number: number) => {
    console.log(`Checking Win for Number: ${number}`);
    const color = getColor(number);
    console.log(`Winning Color: ${color}`);
    const winMultiplier = color === "purple" ? 35 : 2;
    if (color === betColor) {
      updatePlayerMoney(userId, parseFloat(betAmount) * winMultiplier);
    }
  };

  const getColor = (number: number) => {
    return red.includes(number)
      ? "red"
      : black.includes(number)
        ? "black"
        : "purple";
  };

  const placeBet = () => {
    const bet = parseFloat(betAmount);
    if (bet <= 0 || bet > playerMoney) {
      setErrorMessage(`Invalid bet amount: $${betAmount}`);
      return;
    }
    if (!betColor) {
      setErrorMessage("Please select a color to bet on");
      return;
    }
    setErrorMessage("");
    updatePlayerMoney(userId, -bet);
    spinWheel();
  };

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBetAmount(event.target.value);
  };

  const handleColorChange = (color: "red" | "black" | "purple") => {
    setBetColor(color);
  };

  return (
    <div className="roulette-container">
      <PlayerWallet
        playerMoney={playerMoney}
        onHomeClick={onHomeClick}
        gameStarted={isSpinning}
      />
      <div className="game-container">
        <div className="wheel">
          <div className="numbers">
            {numbers.map((number) => (
              <div
                key={number}
                className={`number 
                             ${red.includes(number) ? "red " : ""}
                             ${black.includes(number) ? "black " : ""}
                             ${purple.includes(number) ? "purple " : ""}
                             ${
                               winningNumber === number ? "winning-number " : ""
                             }
                             ${
                               highlightedNumber === number ? "highlight " : ""
                             }`}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        <button className="spin" onClick={placeBet} disabled={isSpinning}>
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="win-display">
          <h3>Winning Number is:</h3>
          <h1>
            {isSpinning
              ? "Loading"
              : winningNumber === null
                ? ""
                : winningNumber}
          </h1>
        </div>
      </div>
      <div className="betting-container">
        <div className="betting-amount">
          <label>
            Bet Amount:
            <input
              type="number"
              value={betAmount}
              onChange={handleBetAmountChange}
              placeholder="Enter your bet"
            />
          </label>
        </div>
        <div className="checkbox-container">
          <label className="checkbox-label red">
            <input
              type="radio"
              name="betColor"
              checked={betColor === "red"}
              onChange={() => handleColorChange("red")}
              id="red-radio"
            />
            <span>Red</span>
          </label>
          <label className="checkbox-label black">
            <input
              type="radio"
              name="betColor"
              checked={betColor === "black"}
              onChange={() => handleColorChange("black")}
              id="black-radio"
            />
            <span>Black</span>
          </label>
          <label className="checkbox-label purple">
            <input
              type="radio"
              name="betColor"
              checked={betColor === "purple"}
              onChange={() => handleColorChange("purple")}
              id="purple-radio"
            />
            <span>Purple</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
