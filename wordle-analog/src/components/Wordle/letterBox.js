import React from "react";
import "../styles/LetterBox.css";

const LetterBox = ({ letter, state }) => {
  return <span className={`letter ${state}`}>{letter}</span>;
};

export default LetterBox;