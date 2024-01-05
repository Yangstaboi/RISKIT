import React, { useState } from "react";
import PlayerWallet from "./PlayerWallet";
import "../CssStyling/Roulette.css";

interface RouletteProps {
  onHomeClick: () => void;
  updatePlayerMoney: (amount: number) => void;
  playerMoney: number;
}

const numbers = [0, 32, 15, 19, 4, 21, 2, 25,17,34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

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
        <div className={`wheel ${isSpinning ? "spinning" : ""}`}>
          <div className="numbers">
            {numbers.map((number) => (
              <div key={number} className={`number ${number === result ? "winner" : ""}`}>
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
