import React, { useState } from "react";

interface IntroPageProps {
  onMenuShow: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onMenuShow }) => {
  const [clicked, setClicked] = useState(false);

  const menuHandler = () => {
    setClicked(true);
    setTimeout(() => {
      onMenuShow();
      setClicked(false);
    }, 600);
  };

  return (
    <div className="centered-content">
      <button
        className={`riskit-button ${clicked ? "riskit-button-clicked" : ""}`}
        onClick={menuHandler}
      >
        <span className="riskit-button-text">Click to RISKIT</span>
      </button>
    </div>
  );
};

export default IntroPage;
