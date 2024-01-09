import testingImage from "../assets/Testing.png";
import MineSweeperImage from "../assets/MineSweeperImage.png";
import DiceImage from "../assets/DiceImage.png";
import RouletteImage from "../assets/RouletteImage.png";
import DealersRiskImage from "../assets/DealersRiskImage.png";
import Leaderboard from "./Leaderboard";
import "../CssStyling/MainMenu.css";
import "../CssStyling/Cashout.css";
import "../CssStyling/TopContainer.css";
import React from "react";

interface MainMenuProps {
  onPlayMinesweeper: () => void;
  onPlayDealersRisk: () => void;
  onDiceGame: () => void;
  onRoulette: () => void;
  playerMoney: number;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onPlayMinesweeper,
  onPlayDealersRisk,
  onDiceGame,
  onRoulette,
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
          <div className="card-description">
            In a 5x5 grid with 25 cells, choose how much money you want to bet
            with and how many mines you want there to be, for every cell you
            click that isn't a mine, you get exponentially more money.
            <p></p>
            <p>
              But once you click a mine, all the money you betted with
              disappears
            </p>
          </div>
        </div>

        <div className="game-card" onClick={() => onPlayDealersRisk()}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${DealersRiskImage})` }}
          ></div>
          <div className="card-title">DealersRisk</div>
          <div className="card-description">
            Imagine you are waiting for the river card in poker and you are
            praying that your flush draw gets drawn.
            <p></p>
            <p>
              Well this game lets you bet which card comes next, except this
              isn't poker and this isn't your river card
            </p>
            <p>Whether you bet suits or numbers, may the odds be against you</p>
          </div>
        </div>

        <div className="game-card" onClick={() => onRoulette()}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${RouletteImage})` }}
          ></div>
          <div className="card-title">Roulette</div>
          <div className="card-description">
            Choose between 3 colours to bet on
            <p></p>
            <p>
              Double your bets with red or black or 36x your bet with purple!
            </p>
            <p></p>
            <p>Spin the wheel and pray!</p>
          </div>
        </div>

        <div className="game-card" onClick={() => onDiceGame()}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${DiceImage})` }}
          ></div>
          <div className="card-title">Dice</div>
          <div className="card-description">
            Guess a number between 1 and 99
            <p></p>
            <p>If the dice rolls a number bigger than your guess, you win</p>
            <p></p>
            <p>Otherwise you lose</p>
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
