import React, { useState } from "react";
import PlayerWallet from "./PlayerWallet";

interface RouletteProps {
  onHomeClick: () => void;
  updatePlayerMoney: (amount: number) => void;
  playerMoney: number;
}

const Roulette: React.FC<RouletteProps> = ({
  onHomeClick,
  updatePlayerMoney,
  playerMoney
}) => {
  
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <div className="roulette-container">
      <PlayerWallet playerMoney={playerMoney} onHomeClick={onHomeClick} gameStarted={gameStarted}/>
      <div className="header">
        <h1>Roulette</h1>
      </div>
    </div>
  );
}

export default Roulette;
