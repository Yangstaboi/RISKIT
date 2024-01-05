import React, { useState } from "react";
import PlayerWallet from "./PlayerWallet";
import "../CssStyling/Roulette.css";

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
  const [result, setResult] = useState<null | number>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  
  const startSpinning = () => {
    setIsSpinning(true);

    setTimeout(() => {
      const randomResult = Math.floor(Math.random() * 37);
      setResult(randomResult);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="roulette-container">
      <PlayerWallet playerMoney={playerMoney} onHomeClick={onHomeClick} gameStarted={gameStarted}/>
      <div className="game-container">
        <div className="wheel">
          <div className="numbers">
            {numbers.map((number) => (
              <div key={number} className={`number 
                                           ${red.includes(number) ? "red" : ""}
                                           ${black.includes(number) ? "black" : ""}
                                           ${purple.includes(number) ? "purple" : ""}` }>
                {number}
              </div>
            ))}
          </div>
        </div>
        <button onClick={startSpinning} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
      </div>
    </div>
  );
}

export default Roulette;
