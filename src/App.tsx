import { useState, useEffect } from "react";
import "./App.css";

function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

const emojis = [
  "😊",
  "😊",
  "😔",
  "😔",
  "🫤",
  "🫤",
  "😁",
  "😁",
  "😂",
  "😂",
  "🤣",
  "🤣",
  "❤️",
  "❤️",
  "😡",
  "😡",
];

function App() {
  const [cards, setCards] = useState<string[]>(emojis);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  useEffect(() => {
    setCards(shuffleArray(emojis));
  }, []);

  useEffect(() => {
    if (openCards.length === 2) {
      const timer = setTimeout(() => {
        checkForMatch();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [openCards]);

  const checkForMatch = () => {
    if (openCards.length === 2) {
      const [cardIndex1, cardIndex2] = openCards;
      if (cards[cardIndex1] === cards[cardIndex2]) {
        setMatchedCards(prev => [...prev, ...openCards]);
      }
      setOpenCards([]);
    }
  };

  const handleCardClick = (index: number) => {
    if (!matchedCards.includes(index) && openCards.length < 2) {
      setOpenCards(prev => [...prev, index]);
    }
  };

  const handleResetClick = () => {
    setCards(shuffleArray(emojis));
    setOpenCards([]);
    setMatchedCards([]);
  };

  return (
    <div className="container">
      <h2>Memory Game</h2>
      <div className="game">
        {cards.map((emoji, index) => {
          const isCardOpen = openCards.includes(index);
          const isCardMatched = matchedCards.includes(index);
          const isCardVisible = isCardOpen || isCardMatched;

          return (
            <div
              key={index}
              className={`item ${isCardVisible ? "cardOpen" : ""} ${
                isCardMatched ? "cardMatched" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {isCardVisible ? emoji : ""}
            </div>
          );
        })}
      </div>
      <button className="reset" onClick={handleResetClick}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
