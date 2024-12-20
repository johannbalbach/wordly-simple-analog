import React from "react";
import "./SubmitButton.css";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button className="submit-button" onClick={onSubmit}>
      Ввод
    </button>
  );
};

export default SubmitButton;