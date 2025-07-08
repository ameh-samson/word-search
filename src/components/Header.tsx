import React from "react";
import { RefreshCwIcon } from "lucide-react";
interface HeaderProps {
  timer: number;
  onReset: () => void;
  gameState: "INITIAL" | "PLAYING" | "WON" | "LOST";
}

const Header: React.FC<HeaderProps> = ({ timer, onReset, gameState }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (gameState !== "PLAYING") return "bg-white bg-opacity-20";
    if (timer <= 30) return "bg-red-500 animate-pulse";
    if (timer <= 60) return "bg-yellow-400";
    return "bg-white bg-opacity-20 text-blue-500";
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold">Word Search Challenge</h1>
      <div className="flex items-center gap-4">
        <div
          className={`rounded-lg px-3 py-1 flex items-center transition-colors duration-200 ${getTimerColor()}`}
        >
          <span className="font-mono font-medium text-xl">
            {formatTime(timer)}
          </span>
        </div>
        {gameState === "PLAYING" && (
          <button
            onClick={onReset}
            className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full p-2 transition-colors duration-200"
            aria-label="Reset game"
          >
            <RefreshCwIcon size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
