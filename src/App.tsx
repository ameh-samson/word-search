import { useCallback, useEffect, useState } from "react";
import { getRandomWords } from "./utils/wordBank";
import { generateWordSearchGrid } from "./utils/wordPlacement";
import { getWordFromSelection } from "./utils/gameLogic";
import Header from "./components/Header";
import GameGrid from "./components/GameGrid";
import WordList from "./components/WordList";
import StartScreen from "./components/StartScreen";
import GameOverScreen from "./components/GameOver";
import WinScreen from "./components/WinScreen";

type GameState = "INITIAL" | "PLAYING" | "WON" | "LOST";

function App() {
  const [gameState, setGameState] = useState<GameState>("INITIAL");
  const [timer, setTimer] = useState(270);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [gridSize] = useState(10);
  const [wordList, setWordList] = useState<string[]>(() => getRandomWords(9));

  const [gridLetters, setGridLetters] = useState<string[][]>(() =>
    generateWordSearchGrid(wordList, gridSize)
  );

  const handleStartGame = useCallback(() => {
    setGameState("PLAYING");
    setTimer(270);
    setSelectedCells([]);
    setFoundWords([]);
    setWordList(getRandomWords(9));
    setGridLetters(generateWordSearchGrid(wordList, gridSize));
  }, [gridSize, wordList]);

  // Check if all words are found
  useEffect(() => {
    if (gameState === "PLAYING" && foundWords.length === wordList.length) {
      setGameState("WON");
    }
  }, [foundWords, wordList, gameState]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === "PLAYING") {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            setGameState("LOST");
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState]);

  const handleReset = useCallback(() => {
    setTimer(180);
    setSelectedCells([]);
    setFoundWords([]);
    setGameState("PLAYING");

    const newWords = getRandomWords(9);
    setWordList(newWords);
    setGridLetters(generateWordSearchGrid(newWords, gridSize));
  }, [gridSize]);

  const checkSelection = useCallback(() => {
    if (selectedCells.length < 2) return;

    const word = getWordFromSelection(selectedCells, gridLetters, gridSize);

    const reversedWord = word.split("").reverse().join("");

    const wordToCheck = wordList.find((w) => w === word || w === reversedWord);
    if (wordToCheck && !foundWords.includes(wordToCheck)) {
      setFoundWords((prev) => [...prev, wordToCheck]);
    }

    setTimeout(() => {
      setSelectedCells([]);
    }, 500);
  }, [selectedCells, gridLetters, wordList, foundWords, gridSize]);

  const handleCellSelect = useCallback(
    (index: number) => {
      if (gameState !== "PLAYING") return;

      if (
        selectedCells.length > 0 &&
        selectedCells[selectedCells.length - 1] === index
      ) {
        checkSelection();
        return;
      }

      if (selectedCells.includes(index)) {
        const cellIndex = selectedCells.indexOf(index);
        setSelectedCells(selectedCells.slice(0, cellIndex + 1));
        return;
      }

      setSelectedCells((prev) => [...prev, index]);
    },
    [selectedCells, checkSelection, gameState]
  );
  return (
    <div className="h-dvh bg-gray-50 flex flex-col items-center p-4 relative">
      <div className="w-full h-full max-w-4xl bg-white rounded-xl shadow-md overflow-y-auto">
        <Header timer={timer} onReset={handleReset} gameState={gameState} />
        <div className="flex flex-col md:flex-row p-4 gap-6">
          <div className="flex-1">
            <GameGrid
              gridLetters={gridLetters}
              selectedCells={selectedCells}
              onCellSelect={handleCellSelect}
            />
          </div>
          <div className="w-full md:w-64">
            <WordList wordList={wordList} foundWords={foundWords} />
          </div>
        </div>
        {/* Game state overlays */}
        {gameState === "INITIAL" && (
          <StartScreen onStartGame={handleStartGame} />
        )}
        {gameState === "LOST" && (
          <GameOverScreen
            foundWords={foundWords}
            totalWords={wordList.length}
            onTryAgain={handleReset}
          />
        )}
        {gameState === "WON" && (
          <WinScreen timeRemaining={timer} onNewGame={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
