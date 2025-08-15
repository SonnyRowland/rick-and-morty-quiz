export const getRandomItems = <T>(array: T[], count: number): T[] => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => 0.5 - Math.random());
};
