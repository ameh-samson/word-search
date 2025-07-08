import React, { useCallback, useEffect, useState, useRef, memo } from "react";
import { isCellInLine, getCellsInLine } from "../utils/gameLogic";
interface GameGridProps {
  gridLetters: string[][];
  selectedCells: number[];
  onCellSelect: (index: number) => void;
}

const GameGrid: React.FC<GameGridProps> = memo(
  ({ gridLetters, selectedCells, onCellSelect }) => {
    const [isDragging, setIsDragging] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const lastCellRef = useRef<number | null>(null);
    // Handle mouse down on a cell
    const handleMouseDown = useCallback(
      (index: number, event: React.MouseEvent) => {
        event.preventDefault();
        setIsDragging(true);
        lastCellRef.current = index;
        onCellSelect(index);
      },
      [onCellSelect]
    );
    // Handle mouse enter during drag
    const handleMouseEnter = useCallback(
      (index: number) => {
        if (!isDragging || lastCellRef.current === null) return;
        const lastSelectedIndex = selectedCells[selectedCells.length - 1];
        // Check if the cell is in line with the current selection
        if (
          selectedCells.length > 1 &&
          !isCellInLine(selectedCells[0], lastSelectedIndex, index)
        ) {
          return;
        }
        // If it's a valid move, get all cells in the line
        const cellsInLine = getCellsInLine(lastSelectedIndex, index);
        // Update last cell reference
        lastCellRef.current = index;
        // Add all cells in the line to the selection
        cellsInLine.slice(1).forEach((cellIndex) => {
          if (!selectedCells.includes(cellIndex)) {
            onCellSelect(cellIndex);
          }
        });
      },
      [isDragging, selectedCells, onCellSelect]
    );
    // Handle mouse up to end selection
    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        lastCellRef.current = null;
        // Trigger check for the selected word
        if (selectedCells.length > 1) {
          onCellSelect(selectedCells[selectedCells.length - 1]);
        }
      }
    }, [isDragging, selectedCells, onCellSelect]);
    // Handle touch events for mobile
    const handleTouchStart = useCallback(
      (index: number, event: React.TouchEvent) => {
        event.preventDefault();
        setIsDragging(true);
        lastCellRef.current = index;
        onCellSelect(index);
      },
      [onCellSelect]
    );
    const handleTouchMove = useCallback(
      (event: React.TouchEvent) => {
        if (!isDragging || !gridRef.current) return;
        const touch = event.touches[0];
        const grid = gridRef.current;
        const gridRect = grid.getBoundingClientRect();
        // Get the cell element at the touch position
        const x = touch.clientX - gridRect.left;
        const y = touch.clientY - gridRect.top;
        // Find the cell under the touch point
        const cellElements = grid.querySelectorAll("button");
        for (let i = 0; i < cellElements.length; i++) {
          const cell = cellElements[i];
          const cellRect = cell.getBoundingClientRect();
          const cellLeft = cellRect.left - gridRect.left;
          const cellRight = cellRect.right - gridRect.left;
          const cellTop = cellRect.top - gridRect.top;
          const cellBottom = cellRect.bottom - gridRect.top;
          if (
            x >= cellLeft &&
            x <= cellRight &&
            y >= cellTop &&
            y <= cellBottom
          ) {
            handleMouseEnter(i);
            break;
          }
        }
      },
      [isDragging, handleMouseEnter]
    );
    const handleTouchEnd = useCallback(() => {
      handleMouseUp();
    }, [handleMouseUp]);
    // Add global mouse up and touch end handlers
    useEffect(() => {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }, [handleMouseUp, handleTouchEnd]);
    return (
      <div
        ref={gridRef}
        className="grid grid-cols-10 gap-1 md:gap-2 max-w-md mx-auto"
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {gridLetters.flat().map((letter, index) => {
          const isSelected = selectedCells.includes(index);
          const isLastSelected =
            selectedCells.length > 0 &&
            selectedCells[selectedCells.length - 1] === index;
          // Calculate selection order number for animation
          const selectionOrder = selectedCells.indexOf(index);
          const animationDelay = selectionOrder > -1 ? selectionOrder * 50 : 0;
          return (
            <button
              key={index}
              className={`
              aspect-square flex items-center justify-center
              text-lg md:text-xl font-medium rounded
              border border-gray-200 shadow-sm
              transition-all duration-200
              ${
                isSelected
                  ? "bg-gradient-to-br from-blue-400 to-indigo-500 text-white transform scale-105"
                  : "bg-white hover:bg-gray-50 text-gray-800 hover:shadow"
              }
              ${isLastSelected ? "ring-2 ring-indigo-300" : ""}
              ${isDragging ? "cursor-pointer" : ""}
            `}
              style={{
                animationDelay: `${animationDelay}ms`,
                transitionDelay: isSelected ? `${animationDelay}ms` : "0ms",
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onMouseEnter={() => handleMouseEnter(index)}
              onTouchStart={(e) => handleTouchStart(index, e)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    );
  }
);

export default GameGrid;
