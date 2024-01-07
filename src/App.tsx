import React, { useState } from "react";
import "./App.css";
import { ref, update } from "firebase/database";
import { database } from "./firebase-config";

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
  const [userId, setUserId] = useState<string>("");
  const [showDice, setShowDice] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [money, setMoney] = useState<number>(0);

  const handleFormSubmit = (
    userName: string,
    userId: string,
    userMoney: number
  ) => {
    setName(userName);
    setUserId(userId); // Set the user's ID in state
    setMoney(userMoney);
    setIsLoggedIn(true);
    setIsMenuVisible(true);
  };

  const updatePlayerMoney = (userId: string, amount: number) => {
    setMoney((prevMoney) => {
      const newMoney = prevMoney + amount;
      if (userId) {
        // Make sure the reference points directly to the money value
        const userMoneyRef = ref(database, `users/${userId}`);
        update(userMoneyRef, { money: newMoney });
      }
      return newMoney;
    });
  };

  const goToMainMenu = () => {
    setShowMinesweeper(false);
    setIsMenuVisible(true);
    setShowDealersRisk(false);
    setShowDice(false);
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
          userId={userId} // Pass the userId state to DealersRisk
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
          userId={userId} // Pass the userId
        />
      ) : showDice ? (
        <DiceGame
          onHomeClick={goToMainMenu}
          updatePlayerMoney={updatePlayerMoney}
          playerMoney={money}
          userId={userId} // Pass the userId
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
