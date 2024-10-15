import React, { useState, useEffect } from 'react';

// Zufallszahl generieren: Für "Doppelt" bis 50, für "Hälfte" bis 100 (nur gerade Zahlen)
const generateRandomNumber = (isDoubleTask) => {
  let randomNumber = isDoubleTask
    ? Math.floor(Math.random() * 50) + 1 // Zufallszahl zwischen 1 und 50
    : Math.floor(Math.random() * 50) * 2; // Zufallszahl zwischen 2 und 100 (nur gerade)
  return randomNumber;
};

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(generateRandomNumber(true)); // Start mit einer zufälligen Zahl
  const [isDoubleTask, setIsDoubleTask] = useState(true); // Aufgabe: Doppelt oder Hälfte
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Aufgabe generieren (bei jedem Wechsel der Zahl oder Aufgabe)
  useEffect(() => {
    generateTask();
  }, [currentNumber, isDoubleTask]);

  // Generiere die Aufgabe und Antwortmöglichkeiten
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

  // Zufällige Reihenfolge der Optionen
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Behandlung eines Klicks auf eine Antwort
  const handleAnswerClick = (selectedAnswer) => {
    const correctAnswer = isDoubleTask ? currentNumber * 2 : currentNumber / 2;
    setAttempts(attempts + 1);

    // Antwort überprüfen
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

  // Spiel zurücksetzen
  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setCorrectAnswers(0);
    setCurrentNumber(generateRandomNumber(true));
    setIsDoubleTask(true);
  };

  // Wenn 20 richtige Antworten erreicht wurden
  if (correctAnswers === 20) {
    return (
      <div style={styles.centeredContainer}>
        <h1>Spiel beendet!</h1>
        <p>Du hast 20 richtige Antworten!</p>
        <p>Dein Endpunktestand: {score}</p>
        <button style={styles.resetButton} onClick={resetGame}>Neues Spiel</button>
      </div>
    );
  }

  return (
    <div style={styles.centeredContainer}>
      <h1>Finde das Doppelte oder die Hälfte</h1>
      <h2>Zahl: {currentNumber}</h2>
      <p>Bestimme: {isDoubleTask ? 'Doppelte' : 'Hälfte'}</p>
      <div style={styles.buttonGrid}>
        {options.map((option, index) => (
          <button
            key={index}
            style={styles.optionButton}
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

// Stile für mobile Optimierung
const styles = {
  centeredContainer: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Zwei Spalten, gut für Handys
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  optionButton: {
    padding: '15px',
    fontSize: '20px', // Größere Schrift für bessere Sichtbarkeit auf kleinen Bildschirmen
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  resetButton: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
