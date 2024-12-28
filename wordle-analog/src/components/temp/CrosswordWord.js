import React from "react";
import "../styles/CrosswordWord.css";

const CrosswordWord = ({ word, desc, onInput, isSecret, position, crossIndex }) => {
  return (
    <div className={`crossword-word ${isSecret ? 'secret-word' : ''}`} style={position}>
      <div className="word-input" data-desc={desc}>
        {Array.from(word).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => onInput(index, e.target.value)}
            className={isSecret && index === crossIndex ? "highlight" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CrosswordWord;