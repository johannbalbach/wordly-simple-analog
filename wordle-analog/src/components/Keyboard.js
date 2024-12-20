import React from "react";
import "./Keyboard.css";

const Keyboard = ({ onKeyPress, onDelete, onSubmit }) => {
  const keys = [
    "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"
  ];

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((key) => (
            <button
              key={key}
              className="key-button"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-actions">
        <button className="key-button" onClick={onDelete}>Delete</button>
        <button className="key-button" onClick={onSubmit}>Enter</button>
      </div>
    </div>
  );
};

export default Keyboard;