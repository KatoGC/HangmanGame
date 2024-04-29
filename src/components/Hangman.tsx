import React, { useState, useEffect } from 'react';

interface HangmanProps {
  key: number; // Prop para forzar el remontaje
  words: string[];
  fruitsList: string[];
  appliancesList: string[];
}

const Hangman = ({ words, fruitsList, appliancesList, key }: HangmanProps) => {
  const [selectedWord, setSelectedWord] = useState(words[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);

const getHint = () =>{
  if (fruitsList.includes(selectedWord)){
    return 'the word is a fruit';
  }else if (appliancesList.includes(selectedWord)){
    return 'the word is an electronic';
  }
  return '';
};

// const displayWord = selectedWord.split('').map((letter, index) => {
//   if (guessedLetters.includes(letter)) {
//     return letter;
//   } else {
//     return '_';
//   }
// });
   const displayWord = selectedWord.split('').map((letter, index) => {
     console.log("selectedWord: ", selectedWord)
     if (guessedLetters.includes(letter)) {
      console.log("guessedLetters: ",guessedLetters)
       return letter;
     } else {
       return '_';
     }
   });

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setErrorCount((prev) => prev + 1);
        console.log("setErrrorCount: ", setErrorCount)
      }
    }
  };

  const restartGame = () => {
    const newWordIndex = Math.floor(Math.random() * words.length);
    const newWord = words[newWordIndex];
    setSelectedWord(newWord);
    setGuessedLetters([]); // Reiniciar las letras adivinadas
    setErrorCount(0);
  };
  

  return (
    <div>
      <p>{displayWord.join(' ')}</p>
      <input maxLength={1} onChange={(e) => handleGuess(e.target.value)} />
      {(displayWord.join('') === selectedWord || errorCount > 5) && (
        <button onClick={restartGame}>Select New Word</button>        
      )}
      <p>Cantidad de errores {errorCount}</p>
      {displayWord.join('') === selectedWord && (
        <p>You won in this round</p>
      )}
    </div>
  );
};

export default Hangman;