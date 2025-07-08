/**
 * Determines if two cells are adjacent (including diagonals)
 */
export function areCellsAdjacent(
  index1: number,
  index2: number,
  gridSize: number = 10
): boolean {
  const row1 = Math.floor(index1 / gridSize);
  const col1 = index1 % gridSize;
  const row2 = Math.floor(index2 / gridSize);
  const col2 = index2 % gridSize;
  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);
  // Cells are adjacent if they are next to each other (including diagonally)
  return rowDiff <= 1 && colDiff <= 1 && (rowDiff !== 0 || colDiff !== 0);
}
/**
 * Determines if a cell is in line with the current selection direction
 */
export function isCellInLine(
  currentIndex: number,
  lastIndex: number,
  newIndex: number,
  gridSize: number = 10
): boolean {
  if (currentIndex === lastIndex) return true;
  const row1 = Math.floor(currentIndex / gridSize);
  const col1 = currentIndex % gridSize;
  const row2 = Math.floor(lastIndex / gridSize);
  const col2 = lastIndex % gridSize;
  const rowNew = Math.floor(newIndex / gridSize);
  const colNew = newIndex % gridSize;
  // Calculate direction vector from first to second cell
  const rowDir = row2 - row1;
  const colDir = col2 - col1;
  // If there's no established direction yet, any adjacent cell is valid
  if (rowDir === 0 && colDir === 0) return true;
  // Calculate the expected direction
  const rowDirNorm = rowDir === 0 ? 0 : rowDir / Math.abs(rowDir);
  const colDirNorm = colDir === 0 ? 0 : colDir / Math.abs(colDir);
  // Check if the new cell follows the same direction
  const rowDiffNew = rowNew - row2;
  const colDiffNew = colNew - col2;
  const rowDirNew = rowDiffNew === 0 ? 0 : rowDiffNew / Math.abs(rowDiffNew);
  const colDirNew = colDiffNew === 0 ? 0 : colDiffNew / Math.abs(colDiffNew);
  return rowDirNorm === rowDirNew && colDirNorm === colDirNew;
}
/**
 * Gets all cells in a line between two cells
 */
export function getCellsInLine(
  startIndex: number,
  endIndex: number,
  gridSize: number = 10
): number[] {
  const startRow = Math.floor(startIndex / gridSize);
  const startCol = startIndex % gridSize;
  const endRow = Math.floor(endIndex / gridSize);
  const endCol = endIndex % gridSize;
  const cells: number[] = [startIndex];
  // Calculate direction
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  if (steps === 0) return cells;
  const rowStep = rowDiff / steps;
  const colStep = colDiff / steps;
  for (let i = 1; i <= steps; i++) {
    const row = Math.round(startRow + i * rowStep);
    const col = Math.round(startCol + i * colStep);
    const index = row * gridSize + col;
    cells.push(index);
  }
  return cells;
}
/**
 * Extracts a word from the grid based on selected cells
 */
export function getWordFromSelection(
  selectedCells: number[],
  gridLetters: string[][],
  gridSize: number = 10
): string {
  return selectedCells
    .map((index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      return gridLetters[row][col];
    })
    .join("");
}
