import React from "react";
interface GameOverScreenProps {
  foundWords: string[];
  totalWords: number;
  onTryAgain: () => void;
}
const GameOverScreen: React.FC<GameOverScreenProps> = ({
  foundWords,
  totalWords,
  onTryAgain,
}) => {
  return (
    <div className="absolute inset-0 bg-red-900 bg-opacity-90 flex flex-col items-center justify-center text-white p-6 z-10">
      <h1 className="text-4xl font-bold mb-4">Time's Up!</h1>
      <p className="text-xl mb-4 text-center">
        You found {foundWords.length} out of {totalWords} words.
      </p>
      <p className="mb-8 text-center max-w-md">
        Don't worry, you can try again with a new set of words!
      </p>
      <button
        onClick={onTryAgain}
        className="bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-lg text-xl transition-colors shadow-lg transform hover:scale-105 duration-200"
      >
        Try Again
      </button>
    </div>
  );
};

export default GameOverScreen;
