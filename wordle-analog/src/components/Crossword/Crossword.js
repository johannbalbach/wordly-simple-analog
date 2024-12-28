// src/components/Crossword/Crossword.js
import React, { useState } from "react";
import "../styles/Crossword.css";
import Keyboard from "../Keyboard";
import SubmitButton from "../SubmitButton";
import { CROSSWORD_DATA } from "../../store/config";

const Crossword = () => {
  const { secret_word, words } = CROSSWORD_DATA;
  const [grid, setGrid] = useState(() => initializeGrid(secret_word, words));
  const [currentInput, setCurrentInput] = useState("");
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [hoveredCellDesc, setHoveredCellDesc] = useState(null);

  function initializeGrid(secretWord, words) {
    const gridSize = secretWord.length;
    secretWord.length != words.length ? console.error("secret word length does not match words count") : console.log("ok");
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    // Place horizontal words
    words.forEach(({ word, cross }, wordIndex) => {
        const row = wordIndex; 
        const colStart = Math.floor(gridSize / 2) - cross;

        for (let i = 0; i < word.length; i++) {
            const col = colStart + i;
            grid[row][col] = {
                letter: word[i],
                isSecret: false,
                filled: false,
                isField: true,
                desc: wordIndex === row ? words[wordIndex].desc : null
            };
        }
    });

    // Place secret word vertically
    for (let i = 0; i < secretWord.length; i++) {
        grid[i][Math.floor(gridSize / 2)] = {
            ...grid[i][Math.floor(gridSize / 2)],
            isSecret: true,
        };
    }

    return grid;
  }

  const handleKeyPress = (key) => {
    if (!selectedCell || !/^[a-zA-Z]$/.test(key)) return;
    const newGrid = [...grid];
    const { row, col } = selectedCell;

    if (newGrid[row][col]) {
      newGrid[row][col].filled = key.toUpperCase();
    }

    const nextCell = findNextCell(row, col, 1);
    if (nextCell)
        setSelectedCell(nextCell);

    setGrid(newGrid);
  };

  const handleDelete = () => {
    if (!selectedCell) return;
    const newGrid = [...grid];
    const { row, col } = selectedCell;

    if (newGrid[row][col]) {
      newGrid[row][col].filled = "";
    }

    const prevCell = findNextCell(row, col, -1);
    if (prevCell) 
        setSelectedCell(prevCell);

    setGrid(newGrid);
  };

  const findNextCell = (row, col, direction) => {
    if (!selectedWord) return null;

    const nextIndex = col + direction;
    if (nextIndex >= 0 && nextIndex < grid.length) {
        return ({row, col: nextIndex});
    }

    return null;
  };

  const handleSubmit = () => {
    if (selectedWord === null) {
      alert("Выберите слово для проверки.");
      return;
    }

    const wordData = selectedWord.word;
    const wordCells = [];

    var col = Math.floor(grid.length / 2) - selectedWord.cross;

    for (let i = 0; i < wordData.length; i++) {
        wordCells.push(grid[selectedWord.id][col]);
        col++;
    }

    const guessedWord = wordCells.map((cell) => cell.filled).join("");
    console.log("guess: ", guessedWord, "wordcells: ", wordCells)

    if (guessedWord === wordData.toUpperCase()) {
      alert(`Слово "${guessedWord}" угадано правильно!`);
    } else {
      alert(`Слово "${guessedWord}" угадано неверно.`);
    }
  };

  const handleCellClick = (row, col) => {
    const cell = grid[row][col];
    if (cell) {
        setSelectedCell({ row, col });
        setSelectedWord(words[row]);
        setHoveredCellDesc(cell.desc);
    }
  };

  return (
    <div className="crossword-container">
        <h1 style={{marginBottom: 10}}>Кроссворд</h1>
        <span style={{marginBottom: 20, fontStyle: "italic"}}>слова заполнять на английском</span>
        <div className="grid">
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => (
                    <>
                    {cell != null ? (
                        <div 
                        key={colIndex}
                        className={`grid-cell ${ cell?.isSecret ? "secret-cell" : ""} ${
                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                            ? "selected-cell"
                            : ""
                        }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                        {cell?.filled || ""}
                    </div>
                    ) : ( 
                        <div className="empty-cell"></div>
                    )}
                    </>
                ))}
            </div>
            ))}
            <div className="word-description">{hoveredCellDesc}</div>
        </div>
        <Keyboard
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
        />
    </div>
  );
};

export default Crossword;