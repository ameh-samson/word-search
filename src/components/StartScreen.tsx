import React from "react";
interface StartScreenProps {
  onStartGame: () => void;
}
const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 bg-indigo-900 bg-opacity-90 flex flex-col items-center justify-center text-white p-6 z-10">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Word Search Challenge
      </h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Find all the hidden words before time runs out! You have 3 minutes.
      </p>
      <button
        onClick={onStartGame}
        className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-lg text-xl transition-colors shadow-lg transform hover:scale-105 duration-200"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
