import React from "react";
import { CheckIcon } from "lucide-react";
interface WordListProps {
  wordList: string[];
  foundWords: string[];
}

const WordList: React.FC<WordListProps> = ({ wordList, foundWords }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full">
      <h2 className="text-lg font-bold text-gray-700 mb-3">Words to Find</h2>
      <ul className="space-y-2">
        {wordList.map((word, index) => {
          const isFound = foundWords.includes(word);
          return (
            <li
              key={index}
              className={`
                flex items-center justify-between
                px-3 py-2 rounded-md
                ${
                  isFound
                    ? "bg-green-100 text-green-800"
                    : "bg-white text-gray-700"
                }
                transition-colors duration-200
                border border-gray-200
              `}
            >
              <span
                className={isFound ? "line-through font-medium" : "font-medium"}
              >
                {word}
              </span>
              {isFound && (
                <span className="flex items-center justify-center bg-green-200 rounded-full p-1">
                  <CheckIcon size={14} className="text-green-700" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WordList;
