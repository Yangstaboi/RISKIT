import React, { useState } from "react";
import "./App.css";
import IntroPage from "./components/IntroPage";
import MainMenu from "./components/MainMenu";
import LoginForm from "./components/LoginForm";
import MinesweeperGame from "./components/MineSweeperGame";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showMinesweeper, setShowMinesweeper] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [money, setMoney] = useState<number | "">("");

  const handleFormSubmit = (userName: string, userMoney: number) => {
    setName(userName);
    setMoney(userMoney);
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {!isMenuVisible ? (
        <IntroPage onMenuShow={() => setIsMenuVisible(true)} />
      ) : !isLoggedIn ? (
        <LoginForm
          userName={name}
          userMoney={money}
          onFormSubmit={handleFormSubmit}
        />
      ) : showMinesweeper ? ( // This line is new
        <MinesweeperGame /> // This line is new
      ) : (
        <MainMenu onPlayMinesweeper={() => setShowMinesweeper(true)} /> // Pass a prop to show Minesweeper when a game card is clicked
      )}
    </div>
  );
};

export default App;
