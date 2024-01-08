import React, { useState } from "react";
import PlayerWallet from "./PlayerWallet";
import "../CssStyling/Roulette.css";
import { setDefaultHighWaterMark } from "stream";

interface RouletteProps {
  onHomeClick: () => void;
  updatePlayerMoney: (amount: number) => void;
  playerMoney: number;
}

const numbers = [0, 32, 15, 19, 4, 21, 2, 25,17,34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const black = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const purple = [0];
const Roulette: React.FC<RouletteProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney
}) => {

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [highlightedNumber, setHighLightedNumber] = useState<number | null>(null);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [isPurpleChecked, setIsPurpleChecked] = useState<boolean>(false);
  const [isRedChecked, setIsRedChecked] = useState<boolean>(false);
  const [isBlackChecked, setIsBlackChecked] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [getWinningColor, setWinningColor] = useState('');
  const [isUserWinner, setIsUserWinner] = useState(false);
  
  const determineWin = (x: number) => {
    console.log(`x === ${x}`);
    const winningColor = red.includes(x) ? 'red' : black.includes(x) ? 'black' : 'purple';
    setWinningColor(winningColor);
    console.log(`Winning Color: ${winningColor}`)
    if ((winningColor === 'red' && isRedChecked) || (winningColor === 'black' && isBlackChecked) || (winningColor === 'purple' && isPurpleChecked)) {
      setIsUserWinner(true);
    } else {
      setIsUserWinner(false);
    }
  } 


  const startSpinning = () => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      setErrorMessage('Please enter a bet amount.');
      return;
    }

    if (parseFloat(betAmount) > playerMoney) {
      alert(`You do not have $${betAmount} to bet!`);
      return;
    }

    if (!isRedChecked && !isBlackChecked && !isPurpleChecked) {
      setErrorMessage('Please select a color to bet on,');
      return;
    }

    updatePlayerMoney(parseFloat(betAmount) * -1);

    setErrorMessage('');
    setWinningNumber(null);
    setIsSpinning(true);

    const totalNumbers = numbers.length;
    let currentNumber = winningNumber !== null ? winningNumber : 0;
    const numOfSpins = Math.floor(Math.random() * (totalNumbers * 3)) + totalNumbers * 2;
    const spinDuration = 30;
    
    const intervalId = setInterval(() => {
      setHighLightedNumber(numbers[currentNumber % totalNumbers]);
      currentNumber++;

      if (currentNumber >= numOfSpins) {
        clearInterval(intervalId);
        setIsSpinning(false);

        let winningIndex = currentNumber % totalNumbers;
        setWinningNumber(numbers[winningIndex]);
        setHighLightedNumber(numbers[winningIndex]);

        console.log(numbers[winningIndex]);
        console.log(`black: ${isBlackChecked}`);
        console.log(`red: ${isRedChecked}`);
        console.log(`purple: ${isPurpleChecked}`);
        console.log(isUserWinner);
        determineWin(numbers[winningIndex]);
   
        if (isUserWinner) {
          if (getWinningColor === 'purple') {
            updatePlayerMoney(parseFloat(betAmount) * 35);
          } else {
            updatePlayerMoney(parseFloat(betAmount) * 2);
          }
        }
      }
    }, spinDuration);
  };

  const handleRedCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPurpleChecked(false);
    setIsBlackChecked(false);
    setIsRedChecked(e.target.checked);
  }

  const handleBlackCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRedChecked(false);
    setIsPurpleChecked(false);
    setIsBlackChecked(e.target.checked);
  }

  const handlePurpleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRedChecked(false);
    setIsBlackChecked(false);
    setIsPurpleChecked(e.target.checked);
  }

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d\.?\d*$/.test(value)) {
      setBetAmount(value);
    }
  }

  return (
    <div className="roulette-container">
      <PlayerWallet playerMoney={playerMoney} onHomeClick={onHomeClick} gameStarted={gameStarted}/>
      <div className="game-container">
        <div className="wheel">
          <div className="numbers">
            {numbers.map((number) => (
              <div key={number} className={`number 
                                           ${red.includes(number) ? "red " : ""}
                                           ${black.includes(number) ? "black " : ""}
                                           ${purple.includes(number) ? "purple " : ""}
                                           ${winningNumber === number ? "winning-number " : ""}
                                           ${highlightedNumber === number ? "highlight " : ""}` }
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        <button className="spin" onClick={startSpinning} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="win-display">
          <h3>Winning Number is:</h3>
          <h1>{isSpinning ? "Loading" : winningNumber === null ? '' : winningNumber}</h1>
        </div>
      </div>
      <div className="betting-container">
        <div className="betting-amount">
          <label>
            bet Amount: 
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
              type="checkbox"
              checked={isRedChecked}
              onChange={handleRedCheckbox}
              id="red-checkbox"
            />
            <span>Red</span>
          </label>
          <label className="checkbox-label black">
            <input
              type="checkbox"
              checked={isBlackChecked}
              onChange={handleBlackCheckbox}
              id="black-checkbox"
            />
            <span>Black</span>
          </label>
          <label className="checkbox-label purple">
            <input
              type="checkbox"
              checked={isPurpleChecked}
              onChange={handlePurpleCheckbox}
              id="purple-checkbox"
            />
            <span>Purple</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Roulette;
