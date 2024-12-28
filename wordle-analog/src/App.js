import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WordlePage from "./components/Wordle/WordlePage";
//import CrosswordPage from "./components/Crossword/CrosswordPage";
import "./App.css";
import Crossword from "./components/Crossword/Crossword";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/crossword" element={<Crossword />} />
      </Routes>
    </Router>
  );
};

export default App;