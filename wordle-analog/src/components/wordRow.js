import React from "react";
import "./WordRow.css";
import LetterBox from "./letterBox";

const WordRow = ({ word, evaluation }) => {
  return (
    <div className="word-row">
      {Array.from({ length: word.length }).map((_, index) => (
        <LetterBox
          key={index}
          letter={word[index] || ""}
          state={evaluation[index] || "absent"}
        />
      ))}
    </div>
  );
};

export default WordRow;
