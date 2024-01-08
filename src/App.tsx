import React, { useState } from "react";
import "./App.css";
import { ref, update } from "firebase/database";
import { database } from "./firebase-config";
import UsernameSetup from "./components/UsernameSetup";
import IntroPage from "./components/IntroPage";
import MainMenu from "./components/MainMenu";
import LoginForm from "./components/LoginForm";
import MinesweeperGame from "./components/MineSweeperGame";
import DealersRisk from "./components/DealersRisk";
import Roulette from "./components/Roulette";
import DiceGame from "./components/DiceGame";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showMinesweeper, setShowMinesweeper] = useState<boolean>(false);
  const [showDealersRisk, setShowDealersRisk] = useState<boolean>(false);
  const [showUsernameSetup, setShowUsernameSetup] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const [showDice, setShowDice] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [money, setMoney] = useState<number>(0);

  const handleFormSubmit = (
    userName: string,
    userId: string,
    userMoney: number,
    isNewUser: boolean
  ) => {
    setName(userName);
    setUserId(userId);
    setMoney(userMoney);
    setIsLoggedIn(true);
    setShowUsernameSetup(isNewUser); // Show the username setup screen if it's a new user
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
    setShowRoulette(false);
    setShowDice(false);
  };

  const goToDealersRisk = () => {
    setIsMenuVisible(false);
    setShowDealersRisk(true);
  };

  return (
    <div className="app-container">
      {showUsernameSetup ? (
        <UsernameSetup
          userId={userId}
          onUsernameSet={() => {
            setShowUsernameSetup(false); // Hide the username setup screen
            setIsMenuVisible(true); // Show the main menu
          }}
        />
      ) : showDealersRisk ? (
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
          isNewUser={false} // Add this line. Assuming the default is false, adjust based on your logic
          onFormSubmit={handleFormSubmit}
        />
      ) : showRoulette ? (
        <Roulette
          onHomeClick={goToMainMenu}
          updatePlayerMoney={updatePlayerMoney}
          playerMoney={money}
          userId={userId}
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
          onRoulette={() => setShowRoulette(true)}
          playerMoney={money}
        />
      )}
    </div>
  );
};

export default App;
