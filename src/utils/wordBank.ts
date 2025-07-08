// A larger bank of words to randomly select from for each game
export const WORD_BANK = [
  "WORD",
  "SEARCH",
  "PUZZLE",
  "GAME",
  "FUN",
  "PLAY",
  "FIND",
  "TIMER",
  "RESET",
  "CHALLENGE",
  "HIDDEN",
  "SEEK",
  "LETTERS",
  "GRID",
  "HUNT",
  "SOLVE",
  "BRAIN",
  "MIND",
  "THINK",
  "SPOT",
  "LOCATE",
  "DISCOVER",
  "DETECT",
  "UNCOVER",
  "SECRET",
  "MYSTERY",
  "CLUE",
  "QUEST",
  "MISSION",
  "GOAL",
];
/**
 * Randomly selects a specified number of words from the word bank
 */
export function getRandomWords(count: number = 9): string[] {
  // Shuffle the word bank
  const shuffled = [...WORD_BANK].sort(() => 0.5 - Math.random());
  // Take the first 'count' words
  return shuffled.slice(0, count);
}
