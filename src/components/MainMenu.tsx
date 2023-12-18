import testingImage from "../assets/testing.png";
import "../CssStyling/MainMenu.css";

interface MainMenuProps {
  onPlayMinesweeper: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onPlayMinesweeper }) => {
  return (
    <div className="menu-container">
      <div className="welcome-button">Welcome to RISKIT</div>
      <div className="game-selection">
        {/* Attach the onClick event handler to the Minesweeper card */}
        <div className="game-card" onClick={onPlayMinesweeper}>
          <div
            className="card-image"
            style={{ backgroundImage: `url(${testingImage})` }}
          ></div>
          <div className="card-title">Minesweeper</div>
          <div className="card-description">Click to play Minesweeper!</div>
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
