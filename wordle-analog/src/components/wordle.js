import React, { useState } from "react";
import { CONFIG } from "../store/config";
import WordRow from "./wordRow";
import Keyboard from "./Keyboard";
import "./Wordle.css";

const Wordle = () => {
    const [attempts, setAttempts] = useState(
      Array(CONFIG.maximumTries).fill({ word: "", evaluation: [] })
    );
    const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0);
    const [currentGuess, setCurrentGuess] = useState([]);
  
    const handleKeyPress = (key) => {
      if (currentGuess.length < CONFIG.wordLength) {
        const updatedGuess = [...currentGuess, key];
        setCurrentGuess(updatedGuess);
  
        const updatedAttempts = [...attempts];
        updatedAttempts[currentAttemptIndex] = {
          ...updatedAttempts[currentAttemptIndex],
          word: updatedGuess.join("")
        };
        setAttempts(updatedAttempts);
      }
    };
  
    const handleDelete = () => {
      if (currentGuess.length > 0) {
        const updatedGuess = currentGuess.slice(0, -1);
        setCurrentGuess(updatedGuess);
  
        const updatedAttempts = [...attempts];
        updatedAttempts[currentAttemptIndex] = {
          ...updatedAttempts[currentAttemptIndex],
          word: updatedGuess.join("")
        };
        setAttempts(updatedAttempts);
      }
    };
  
    const evaluateGuess = (guess) => {
      const evaluation = Array(CONFIG.wordLength).fill("absent");
      const secretWordLetters = CONFIG.secretWord.split("");
  
      console.log(secretWordLetters);
      // Mark correct letters first
      guess.forEach((letter, index) => {
        if (secretWordLetters[index] === letter) {
          evaluation[index] = "correct";
          secretWordLetters[index] = null; // Mark letter as used
        }
      });
  
      // Mark present letters
      guess.forEach((letter, index) => {
        if (evaluation[index] === "absent" && secretWordLetters.includes(letter)) {
          evaluation[index] = "present";
          secretWordLetters[secretWordLetters.indexOf(letter)] = null; // Mark letter as used
        }
      });
  
      return evaluation;
    };
  
    const handleSubmit = () => {
        console.log(currentGuess)
        if (currentGuess.length === CONFIG.wordLength) {
            const guessString = currentGuess.join("");
            const evaluation = evaluateGuess(currentGuess);
            console.log(evaluation)
            const updatedAttempts = [...attempts];
            updatedAttempts[currentAttemptIndex] = { word: guessString, evaluation };
            setAttempts(updatedAttempts);
            setCurrentGuess([]);
            setCurrentAttemptIndex(currentAttemptIndex + 1);
        } else {
            alert("Word is incomplete!");
        }
    };
  
    return (
      <div className="wordle">
        <h1>Wordle Clone</h1>
        <div className="attempts">
          {attempts.map((attempt, index) => (
            <WordRow
              key={index}
              word={attempt.word.padEnd(CONFIG.wordLength)}
              evaluation={attempt.evaluation}
            />
          ))}
        </div>
        {currentAttemptIndex < CONFIG.maximumTries && (
          <Keyboard
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    );
  };
  
  export default Wordle;