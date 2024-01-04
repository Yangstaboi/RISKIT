import React, { useState } from "react";
import "../CssStyling/DealersRisk.css";
import aceOfSpades from "../assets/Cards/ace_of_spades.png";
import twoOfSpades from "../assets/Cards/2_of_spades.png";
import threeOfSpades from "../assets/Cards/3_of_spades.png";
import fourOfSpades from "../assets/Cards/4_of_spades.png";
import fiveOfSpades from "../assets/Cards/5_of_spades.png";
import sixOfSpades from "../assets/Cards/6_of_spades.png";
import sevenOfSpades from "../assets/Cards/7_of_spades.png";
import eightOfSpades from "../assets/Cards/8_of_spades.png";
import nineOfSpades from "../assets/Cards/9_of_spades.png";
import tenOfSpades from "../assets/Cards/10_of_spades.png";
import jackOfSpades from "../assets/Cards/jack_of_spades.png";
import queenOfSpades from "../assets/Cards/queen_of_spades.png";
import kingOfSpades from "../assets/Cards/king_of_spades.png";

import aceOfHearts from "../assets/Cards/ace_of_hearts.png";
import twoOfHearts from "../assets/Cards/2_of_hearts.png";
import threeOfHearts from "../assets/Cards/3_of_hearts.png";
import fourOfHearts from "../assets/Cards/4_of_hearts.png";
import fiveOfHearts from "../assets/Cards/5_of_hearts.png";
import sixOfHearts from "../assets/Cards/6_of_hearts.png";
import sevenOfHearts from "../assets/Cards/7_of_hearts.png";
import eightOfHearts from "../assets/Cards/8_of_hearts.png";
import nineOfHearts from "../assets/Cards/9_of_hearts.png";
import tenOfHearts from "../assets/Cards/10_of_hearts.png";
import jackOfHearts from "../assets/Cards/jack_of_hearts.png";
import queenOfHearts from "../assets/Cards/queen_of_hearts.png";
import kingOfHearts from "../assets/Cards/king_of_hearts.png";

import aceOfDiamonds from "../assets/Cards/ace_of_diamonds.png";
import twoOfDiamonds from "../assets/Cards/2_of_diamonds.png";
import threeOfDiamonds from "../assets/Cards/3_of_diamonds.png";
import fourOfDiamonds from "../assets/Cards/4_of_diamonds.png";
import fiveOfDiamonds from "../assets/Cards/5_of_diamonds.png";
import sixOfDiamonds from "../assets/Cards/6_of_diamonds.png";
import sevenOfDiamonds from "../assets/Cards/7_of_diamonds.png";
import eightOfDiamonds from "../assets/Cards/8_of_diamonds.png";
import nineOfDiamonds from "../assets/Cards/9_of_diamonds.png";
import tenOfDiamonds from "../assets/Cards/10_of_diamonds.png";
import jackOfDiamonds from "../assets/Cards/jack_of_diamonds.png";
import queenOfDiamonds from "../assets/Cards/queen_of_diamonds.png";
import kingOfDiamonds from "../assets/Cards/king_of_diamonds.png";

import aceOfClubs from "../assets/Cards/ace_of_clubs.png";
import twoOfClubs from "../assets/Cards/2_of_clubs.png";
import threeOfClubs from "../assets/Cards/3_of_clubs.png";
import fourOfClubs from "../assets/Cards/4_of_clubs.png";
import fiveOfClubs from "../assets/Cards/5_of_clubs.png";
import sixOfClubs from "../assets/Cards/6_of_clubs.png";
import sevenOfClubs from "../assets/Cards/7_of_clubs.png";
import eightOfClubs from "../assets/Cards/8_of_clubs.png";
import nineOfClubs from "../assets/Cards/9_of_clubs.png";
import tenOfClubs from "../assets/Cards/10_of_clubs.png";
import jackOfClubs from "../assets/Cards/jack_of_clubs.png";
import queenOfClubs from "../assets/Cards/queen_of_clubs.png";
import kingOfClubs from "../assets/Cards/king_of_clubs.png";

const cardImages = [
  aceOfSpades,
  twoOfSpades,
  threeOfSpades,
  fourOfSpades,
  fiveOfSpades,
  sixOfSpades,
  sevenOfSpades,
  eightOfSpades,
  nineOfSpades,
  tenOfSpades,
  jackOfSpades,
  queenOfSpades,
  kingOfSpades,

  aceOfHearts,
  twoOfHearts,
  threeOfHearts,
  fourOfHearts,
  fiveOfHearts,
  sixOfHearts,
  sevenOfHearts,
  eightOfHearts,
  nineOfHearts,
  tenOfHearts,
  jackOfHearts,
  queenOfHearts,
  kingOfHearts,

  aceOfDiamonds,
  twoOfDiamonds,
  threeOfDiamonds,
  fourOfDiamonds,
  fiveOfDiamonds,
  sixOfDiamonds,
  sevenOfDiamonds,
  eightOfDiamonds,
  nineOfDiamonds,
  tenOfDiamonds,
  jackOfDiamonds,
  queenOfDiamonds,
  kingOfDiamonds,

  aceOfClubs,
  twoOfClubs,
  threeOfClubs,
  fourOfClubs,
  fiveOfClubs,
  sixOfClubs,
  sevenOfClubs,
  eightOfClubs,
  nineOfClubs,
  tenOfClubs,
  jackOfClubs,
  queenOfClubs,
  kingOfClubs,
];

interface DealersRiskProps {
  onHomeClick: () => void;
  playerMoney: number;
  updatePlayerMoney: (money: number) => void;
}

const DealersRisk: React.FC<DealersRiskProps> = ({
  onHomeClick,
  playerMoney,
  updatePlayerMoney,
}) => {
  const [option, setOption] = useState("suits");
  const [betAmount, setBetAmount] = useState(1);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const suitSymbols = {
    clubs: "♣",
    diamonds: "♦",
    hearts: "♥",
    spades: "♠",
  };

  type Suit = keyof typeof suitSymbols;

  const suits: Suit[] = ["clubs", "diamonds", "hearts", "spades"];

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  type NumberOption =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";

  const numberWordMap: { [key in NumberOption]: string } = {
    "1": "ace",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    J: "jack",
    Q: "queen",
    K: "king",
  };

  const handleCardClick = (chosenOption: string) => {
    if (playerMoney < betAmount) {
      alert("You don't have enough money to place this bet."); // or handle this however you prefer
      return; // Exit the function early
    }
    const newCardIndex = Math.floor(Math.random() * cardImages.length);
    const newCardImage = cardImages[newCardIndex];
    setSelectedCard(newCardImage);

    const correctCardParts = newCardImage.split("/").pop()?.split("_of_");
    if (correctCardParts) {
      const [numberPart, suitPartWithExtension] = correctCardParts;
      const suitPart = suitPartWithExtension.split(".")[0];

      let isCorrect = false;
      let payoutMultiplier = 0;

      // When the option is 'suits', we check if the chosenOption matches the suit part directly
      if (option === "suits" && chosenOption === suitPart) {
        isCorrect = true;
        payoutMultiplier = 3; // Set the payout multiplier for suits
      }
      // When the option is 'numbers', we convert the number part to its corresponding word
      // and then compare it with the chosen option after converting it using the numberWordMap
      else if (option === "numbers") {
        const numberWord =
          numberPart === "1" ? "ace" : numberPart.toUpperCase();
        const convertedChosenOption =
          numberWordMap[chosenOption as NumberOption];
        if (convertedChosenOption.toLowerCase() === numberWord.toLowerCase()) {
          isCorrect = true;
          payoutMultiplier = 12;
        }
      }

      if (isCorrect) {
        const winnings = betAmount * payoutMultiplier;
        updatePlayerMoney(winnings);
      } else {
        updatePlayerMoney(-betAmount);
      }
    }
  };

  return (
    <div className="dealers-risk-container">
      <div className="top-container">
        <button className="home-button" onClick={onHomeClick}>
          Home
        </button>
        <div className="player-wallet">
          <span className="wallet-icon">🪙</span>
          <span>${playerMoney.toFixed(2)}</span>
        </div>
      </div>
      <div className="betting-and-card-container">
        <div className="betting-container">
          <div className="option-buttons">
            <button
              onClick={() => setOption("suits")}
              className={`option-button ${option === "suits" ? "active" : ""}`}
            >
              Suits
            </button>
            <button
              onClick={() => setOption("numbers")}
              className={`option-button ${
                option === "numbers" ? "active" : ""
              }`}
            >
              Numbers
            </button>
          </div>
          <form
            className="dealers-betting-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="betAmount">Bet Amount:</label>
            <input
              type="number"
              id="betAmount"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              min="1"
            />
          </form>
          <section className="suit-selection-section">
            {option === "suits"
              ? suits.map((suit) => (
                  <button
                    key={suit}
                    className="suit-button"
                    onClick={() => handleCardClick(suit)}
                  >
                    {suitSymbols[suit]}
                  </button>
                ))
              : numbers.map((number) => (
                  <button
                    key={number}
                    className="number-button"
                    onClick={() => handleCardClick(number)}
                  >
                    {number}
                  </button>
                ))}
          </section>
        </div>
        <section className="card-display-section">
          {selectedCard ? (
            <img
              src={selectedCard}
              alt="Selected Card"
              className="card-image1"
            />
          ) : (
            <div className="card-back"></div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DealersRisk;
