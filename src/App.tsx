import React, { useState } from "react";
import "./App.css";
import IntroPage from "./components/IntroPage";
import MainMenu from "./components/MainMenu";

const App: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="app-container">
      {!isMenuVisible ? (
        <IntroPage onMenuShow={() => setIsMenuVisible(true)} />
      ) : (
        <MainMenu />
      )}
    </div>
  );
};

export default App;
