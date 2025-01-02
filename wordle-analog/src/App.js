import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WordlePage from "./components/Wordle/WordlePage";
import "./App.css";
import Crossword from "./components/Crossword/Crossword";
import JeopardyGame from "./components/Jeopardy/JeopardyGame";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/jeopardy" element={<JeopardyGame/>} />
      </Routes>
    </Router>
  );
};

export default App;