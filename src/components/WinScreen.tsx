import React from "react";
interface WinScreenProps {
  timeRemaining: number;
  onNewGame: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ timeRemaining, onNewGame }) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="absolute inset-0 bg-green-900 bg-opacity-90 flex flex-col items-center justify-center text-white p-6 z-10">
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <p className="text-xl mb-4 text-center">
        You found all the words with {formatTime(timeRemaining)} remaining!
      </p>
      <p className="mb-8 text-center max-w-md">
        Great job! Want to challenge yourself with a new set of words?
      </p>
      <button
        onClick={onNewGame}
        className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-xl transition-colors shadow-lg transform hover:scale-105 duration-200"
      >
        New Game
      </button>
    </div>
  );
};

export default WinScreen;
