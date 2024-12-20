import React from "react";
import "./LetterBox.css";

const LetterBox = ({ letter, state }) => {
  return <span className={`letter ${state}`}>{letter}</span>;
};

export default LetterBox;