import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <Link to="/wordle">Wordle</Link>
      <Link to="/crossword">Crossword</Link>
      <Link to="/jeopardy">Jeopardy</Link>
    </nav>
  );
};

export default NavigationBar;
