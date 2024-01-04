import React, { useState } from "react";
import "./App.css";
import IntroPage from "./components/IntroPage";
import MainMenu from "./components/MainMenu";
import LoginForm from "./components/LoginForm";
import MinesweeperGame from "./components/MineSweeperGame";
import DealersRisk from "./components/DealersRisk";
import DiceGame from "./components/DiceGame";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showMinesweeper, setShowMinesweeper] = useState<boolean>(false);
  const [showDealersRisk, setShowDealersRisk] = useState<boolean>(false);
  const [showDice, setShowDice] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [money, setMoney] = useState<number>(0);

  const handleFormSubmit = (userName: string, userMoney: number) => {
    setName(userName);
    setMoney(userMoney);
    setIsLoggedIn(true);
  };

  const updatePlayerMoney = (amount: number) => {
    setMoney((prevMoney) => prevMoney + amount);
  };

  const goToMainMenu = () => {
    setShowMinesweeper(false);
    setIsMenuVisible(true);
  };

  const goToDealersRisk = () => {
    setIsMenuVisible(false);
    setShowDealersRisk(true);
  };

  return (
    <div className="app-container">
      {showDealersRisk ? (
        <DealersRisk
          onHomeClick={() => {
            setShowDealersRisk(false);
            setIsMenuVisible(true);
          }}
          updatePlayerMoney={updatePlayerMoney}
          playerMoney={money}
        />
      ) : !isMenuVisible ? (
        <IntroPage onMenuShow={() => setIsMenuVisible(true)} />
      ) : !isLoggedIn ? (
        <LoginForm
          userName={name}
          userMoney={money}
          onFormSubmit={handleFormSubmit}
        />
      ) : showMinesweeper ? (
        <MinesweeperGame
          onHomeClick={goToMainMenu}
          updatePlayerMoney={updatePlayerMoney}
          playerMoney={money}
        />
      ) : showDice ? (
        <DiceGame
          onHomeClick={goToMainMenu}
          updatePlayerMoney={updatePlayerMoney}
          playerMoney={money}
        />
      ) : (
        <MainMenu
          onPlayMinesweeper={() => setShowMinesweeper(true)}
          onPlayDealersRisk={goToDealersRisk}
          onDiceGame={() => setShowDice(true)}
          playerMoney={money}
        />
      )}
    </div>
  );
};

export default App;
