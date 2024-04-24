import React, { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Hangman from "./components/Hangman";

const wordLists = [
  { name: 'fruit', words: ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'] },
  { name: 'fruit 2', words: ['orange', 'pear', 'pineapple', 'plum', 'raspberry', 'strawberry', 'watermelon'] },
  { name: 'vegetables', words: ['carrot', 'cucumber', 'lettuce', 'potato', 'tomato', 'pepper', 'broccoli'] },
  { name: 'pets', words: ['dog', 'cat', 'bird', 'hamster', 'rabbit', 'fish', 'turtle'] },
  { name: 'animals', words: ['elephant', 'lion', 'tiger', 'giraffe', 'zebra', 'rhinoceros', 'hippopotamus'] }
];

function App() {
  const [selectedList, setSelectedList] = useState<any>({ name: '', words: [] });
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [key, setKey] = useState<number>(0); // Estado para forzar el remontaje de Hangman
  const [count, setCount] = useState<number>(0); // Estado para el contador

  const selectRandomWordList = () => {
    const randomIndex = Math.floor(Math.random() * wordLists.length);
    const randomList = wordLists[randomIndex];
    setSelectedList(randomList);
    const randomWord = randomList.words[Math.floor(Math.random() * randomList.words.length)];
    setSelectedWord(randomWord);
    setHint(`Hint: The word has ${randomWord.length} letters.`);
    setKey(prevKey => prevKey + 1); // Incrementar la key para forzar el remontaje de Hangman
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <Welcome />
      <button onClick={selectRandomWordList}>Select Random Word</button>
      {selectedWord && (
        <p>The selected word is from list {selectedList.name}</p>
      )}
      {selectedWord && <Hangman key={key} words={[selectedWord]} />} {/* Añadir key prop */}
      {hint && <p>{hint}</p>}
      <p>{count} seconds have passed</p>
    </div>
  );
}

export default App;
