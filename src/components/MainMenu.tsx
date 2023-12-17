import testingImage from "../assets/testing.png";

const MainMenu = () => {
  return (
    <div className="menu-container">
      <div className="welcome-button">Welcome to RISKIT</div>
      <div className="game-selection">
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Poker</div>
          <p>This is a brief description</p>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <h2>Roulette</h2>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <h2>RISKIT</h2>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <h2>Poker</h2>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <h2>BlackJack</h2>
        </div>
        <div className="game-card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <h2>Bacarat</h2>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
