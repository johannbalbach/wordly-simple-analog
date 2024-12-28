import React, { useState, useEffect } from "react";
import { CROSSWORD_DATA } from "../../store/config";
//import CrosswordWord from "./CrosswordWord";
//import Keyboard from "../Keyboard";
//import "../styles/CrosswordPage.css";

const CrosswordPage = () => {
  const [inputs, setInputs] = useState(
    CROSSWORD_DATA.words.map((word) => Array(word.word.length).fill(""))
  );
  const [currentFocus, setCurrentFocus] = useState({ wordIndex: 0, letterIndex: 0 });

  const handleKeyPress = (key) => {
    const { wordIndex, letterIndex } = currentFocus;
    const updatedInputs = [...inputs];

    if (key === "Delete") {
      if (letterIndex > 0) {
        updatedInputs[wordIndex][letterIndex - 1] = "";
        setCurrentFocus({ wordIndex, letterIndex: letterIndex - 1 });
      }
    } else if (key === "Enter") {
      // Implement validation logic if needed
    } else if (key.length === 1 && /[а-яА-ЯёЁ]/.test(key)) {
      updatedInputs[wordIndex][letterIndex] = key;
      if (letterIndex < updatedInputs[wordIndex].length - 1) {
        setCurrentFocus({ wordIndex, letterIndex: letterIndex + 1 });
      }
    }

    setInputs(updatedInputs);
  };

  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      handleKeyPress(e.key);
    };
    document.addEventListener("keypress", handleGlobalKeyPress);
    return () => document.removeEventListener("keypress", handleGlobalKeyPress);
  }, [currentFocus, inputs]);

  const getWordPosition = (index, crossIndex) => {
    const topOffset = crossIndex * 40; // Adjust spacing between rows
    const leftOffset = index === 0 ? crossIndex * 40 : 200 + index * 50; // Secret word centered
    return {
      position: "absolute",
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
    };
  };

  return (
    <div className="crossword-page">
      <h1>Crossword</h1>
      <div className="crossword-grid">
        {CROSSWORD_DATA.words.map((word, index) => (
          <CrosswordWord
            key={word.id}
            word={word.word}
            desc={word.desc}
            onInput={(letterIndex, value) => handleKeyPress(value)}
            isSecret={index === 0}
            position={getWordPosition(index, word.cross)}
            crossIndex={word.cross}
          />
        ))}
      </div>
      <Keyboard
        onKeyPress={(key) => handleKeyPress(key)}
        onDelete={() => handleKeyPress("Delete")}
        onSubmit={() => handleKeyPress("Enter")}
      />
    </div>
  );
};

export default CrosswordPage;