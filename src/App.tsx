import React, { useState } from "react";
import "./App.css";
import IntroPage from "./components/IntroPage";
import MainMenu from "./components/MainMenu";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [name, setName] = useState<string>('');
  const [money, setMoney] = useState<number | ''>('');

  const handleFormSubmit = (userName: string, userMoney: number) => {
    setName(userName);
    setMoney(userMoney);
    setIsLoggedIn(true);
  }

  return (
    <div className="app-container">
      {!isMenuVisible ? (
        <IntroPage onMenuShow={() => setIsMenuVisible(true)} />
      ) : ( !isLoggedIn ? <LoginForm userName={name} userMoney={money} onFormSubmit={handleFormSubmit} /> : <MainMenu /> 
      )}
      <p>{name} {money}</p>
    </div>

  );
};

export default App;
