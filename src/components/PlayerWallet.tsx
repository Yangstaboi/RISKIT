import react, { useState } from "react";

interface PlayerWalletProps {
  playerMoney: number;
  onHomeClick: () => void;
  gameStarted: boolean;
}

const PlayerWallet: React.FC<PlayerWalletProps> = ({
  playerMoney,
  onHomeClick,
  gameStarted
}) => {
  const handleHomeClick = () => {
    if (gameStarted) {
      const confirm = window.confirm(
        "Are you sure you want to return home? This will end the current game."
      );
      if (!confirm) return;
    }
    onHomeClick();
  };


  return(
    <div className="top-container">
      <button className="home-button" onClick={handleHomeClick}>
        Home
      </button>
      <div className="player-wallet">
        <span className="wallet-icon">🪙</span>
        <span>${playerMoney.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default PlayerWallet;
