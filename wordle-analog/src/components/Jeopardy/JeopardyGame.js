// components/Jeopardy/JeopardyGame.js
import React, { useState } from 'react';
import { JEOPARDY_DATA } from '../../store/config';
import '../styles/JeopardyGame.css';

const JeopardyGame = () => {
    const [score, setScore] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleQuestionClick = (categoryIndex, questionIndex) => {
        const question = JEOPARDY_DATA[categoryIndex].questions[questionIndex];
        if (!question.used) {
            setSelectedQuestion({ ...question, categoryIndex, questionIndex });
            setUserAnswer('');
            setIsAnswered(false);
        }
    };

    const handleSubmit = () => {
        if (!selectedQuestion) return;

        const { answer, points, categoryIndex, questionIndex } = selectedQuestion;
        const isCorrect = userAnswer.trim().toLowerCase() === answer.trim().toLowerCase();

        setScore(prevScore => prevScore + (isCorrect ? points : -points));
        JEOPARDY_DATA[categoryIndex].questions[questionIndex].used = true;
        setIsAnswered(true);
    };

    const closeModal = () => setSelectedQuestion(null);

    return (
        <div className="jeopardy-game">
            <h1>Своя игра</h1>
            <div className="score">Счёт: {score}</div>
            <div className="board">
                {JEOPARDY_DATA.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="category">
                        <div className="category-container">
                            <div className="category-title cell">{category.category}</div>
                            {category.questions.map((q, questionIndex) => (
                                <button
                                    key={questionIndex}
                                    className="question cell"
                                    disabled={q.used}
                                    onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
                                >
                                    {q.points}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedQuestion && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedQuestion.question}</h2>
                        {isAnswered ? (
                            <p>
                                Правильный ответ: {selectedQuestion.answer}
                                <br />
                                {userAnswer.trim().toLowerCase() === selectedQuestion.answer.trim().toLowerCase()
                                    ? 'Правильно!'
                                    : 'Неправильно!'}
                            </p>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={e => setUserAnswer(e.target.value)}
                                    placeholder="Ваш ответ"
                                />
                                <button onClick={handleSubmit}>Submit</button>
                            </>
                        )}
                        <button onClick={closeModal}>Close</button>
                        <div
                            className="more-info-icon"
                            onMouseEnter={() => setShowHint(true)}
                            onMouseLeave={() => setShowHint(false)}
                        >
                            <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 17V11" stroke="#E2DD92" stroke-width="1.5" stroke-linecap="round"/>
                                <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#E2DD92"/>
                                <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            {showHint && (
                                <div className="tooltip">
                                    {selectedQuestion.hint || 'No hint available'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JeopardyGame;
