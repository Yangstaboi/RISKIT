import testingImage from "../assets/testing.png";
import MineSweeperImage from "../assets/MineSweeper.png";
import Leaderboard from "./Leaderboard";
import "../CssStyling/MainMenu.css";
import "../CssStyling/Cashout.css";
import "../CssStyling/TopContainer.css";
import React from "react";

interface MainMenuProps {
  onPlayMinesweeper: () => void;
  onPlayDealersRisk: () => void;
  onDiceGame: () => void;
  playerMoney: number;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onPlayMinesweeper,
  onPlayDealersRisk,
  onDiceGame,
  playerMoney,
}) => {
  return (
    <div className="menu-container">
      <div className="fixed-top-left welcome-button">RISKIT</div>
      <div className="top-container">
        <div className="player-wallet">
          <span className="wallet-icon">🪙</span>
          <span>${playerMoney.toFixed(2)}</span>
        </div>
      </div>
      <div className="Cashout-button">Cashout</div>
      <Leaderboard />
      <div className="game-selection">
        <div className="game-card" onClick={onPlayMinesweeper}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${MineSweeperImage})` }}
          ></div>
          <div className="card-title">Minesweeper</div>
          <div className="card-description">Click to play Minesweeper!</div>
        </div>

        <div className="game-card" onClick={() => onPlayDealersRisk()}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">DealersRisk</div>
          <div className="card-description">Dealers Risk</div>
        </div>

        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Poker</div>
          <div className="card-description">
            This is a brief description, I love playing poker and gambling all
            my money away blah blah this is a test to see if it wraps and see
            how nice the font
          </div>
        </div>

        <div className="game-card" onClick={() => onDiceGame()}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Dice</div>
          <div className="card-description">Dice Game description</div>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Poker</div>
          <div className="card-description">
            This is a brief description, I love playing poker and gambling all
            my money away blah blah this is a test to see if it wraps and see
            how nice the font
          </div>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Poker</div>
          <div className="card-description">
            This is a brief description, I love playing poker and gambling all
            my money away blah blah this is a test to see if it wraps and see
            how nice the font
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
