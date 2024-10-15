import React, { useState, useEffect } from 'react';

const generateRandomNumber = (isDoubleTask) => {
  let randomNumber = Math.floor(Math.random() * 50) + 1;
  // Wenn die Aufgabe ist, die Hälfte zu bestimmen, muss die Zahl gerade sein
  if (!isDoubleTask && randomNumber % 2 !== 0) {
    randomNumber += 1; // Stelle sicher, dass die Zahl gerade ist
  }
  return randomNumber;
};

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber(true)); // Start mit einer zufälligen Zahl
  const [isDoubleTask, setIsDoubleTask] = useState(true); // Aufgabe: Doppelt oder Hälfte
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  useEffect(() => {
    generateTask();
  }, [currentNumber, isDoubleTask]);

  const generateTask = () => {
    const correctAnswer = isDoubleTask ? currentNumber * 2 : currentNumber / 2;
    const newOptions = [];
    
    // 10 zufällige Optionen generieren, inklusive der richtigen
    for (let i = 0; i < 9; i++) {
      newOptions.push(Math.floor(Math.random() * 100)); // Zufallszahlen als falsche Antworten
    }
    newOptions.push(correctAnswer);
    shuffle(newOptions);
    setOptions(newOptions);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = isDoubleTask ? currentNumber * 2 : currentNumber / 2;
    setAttempts(attempts + 1);
    
    if (selectedAnswer === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
      setScore(score + 1);
    } else {
      setScore(score - 1); // Bei falscher Antwort Punkt abziehen
    }
    
    // Nächste Aufgabe vorbereiten
    const newTaskType = Math.random() > 0.5; // Zufällig zwischen "Doppelt" oder "Hälfte"
    setIsDoubleTask(newTaskType);
    setCurrentNumber(generateRandomNumber(newTaskType));
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setCorrectAnswers(0);
    setCurrentNumber(generateRandomNumber(true));
    setIsDoubleTask(true);
  };

  if (correctAnswers === 20) {
    return (
      <div>
        <h1>Spiel beendet!</h1>
        <p>Du hast 20 richtige Antworten!</p>
        <p>Dein Endpunktestand: {score}</p>
        <button onClick={resetGame}>Neues Spiel</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Finde das Doppelte oder die Hälfte</h1>
      <h2>Zahl: {currentNumber}</h2>
      <p>Bestimme: {isDoubleTask ? 'Doppelte' : 'Hälfte'}</p>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            style={{
              margin: '5px',
              padding: '10px 20px',
              fontSize: '18px',
            }}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Richtige Antworten: {correctAnswers} / 20</p>
        <p>Punktestand: {score}</p>
        <p>Versuche: {attempts}</p>
      </div>
    </div>
  );
};

export default App;
