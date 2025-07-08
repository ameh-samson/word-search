// Directions for word placement (8 directions)
// [row delta, column delta]
const DIRECTIONS = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // down-right
  [1, -1], // down-left
  [0, -1], // left
  [-1, 0], // up
  [-1, 1], // up-right
  [-1, -1], // up-left
];
/**
 * Generates a grid with words placed in random directions
 */
export function generateWordSearchGrid(
  words: string[],
  size: number = 10
): { grid: string[][]; placedWords: string[] } {
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  const grid: string[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
  const placedWords: string[] = [];

  for (const word of sortedWords) {
    if (placeWord(grid, word)) {
      placedWords.push(word);
    }
  }

  fillEmptyCells(grid);
  return { grid, placedWords };
}

/* Attempts to place a word in the grid
 */
function placeWord(grid: string[][], word: string): boolean {
  const size = grid.length;
  const maxAttempts = 100;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Choose random starting position and direction
    const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    const startRow = Math.floor(Math.random() * size);
    const startCol = Math.floor(Math.random() * size);
    // Check if word fits in this direction
    if (wordFits(grid, word, startRow, startCol, direction)) {
      // Place the word
      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * direction[0];
        const col = startCol + i * direction[1];
        grid[row][col] = word[i];
      }
      return true;
    }
  }
  return false;
}
/**
 * Checks if a word can be placed at the given position and direction
 */
function wordFits(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: number[]
): boolean {
  const size = grid.length;
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction[0];
    const col = startCol + i * direction[1];
    // Check if position is within grid bounds
    if (row < 0 || row >= size || col < 0 || col >= size) {
      return false;
    }
    // Check if cell is empty or has the same letter
    if (grid[row][col] !== "" && grid[row][col] !== word[i]) {
      return false;
    }
  }
  return true;
}
/**
 * Fills empty cells with random letters
 */
function fillEmptyCells(grid: string[][]): void {
  const size = grid.length;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === "") {
        grid[row][col] = letters.charAt(
          Math.floor(Math.random() * letters.length)
        );
      }
    }
  }
}
