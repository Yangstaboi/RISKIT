const MainMenu = () => {
  return (
    <div className="menu-container">
      <div className="welcome-button">Welcome to RISKIT</div>
      <div className="game-selection">
        <button className="game-button">Minesweeper</button>
        <button className="game-button">Roulette</button>
        <button className="game-button">RISKIT</button>
        <button className="game-button">Poker</button>
        <button className="game-button">BlackJack</button>
        <button className="game-button">Bacarat</button>
      </div>
    </div>
  );
};

export default MainMenu;
