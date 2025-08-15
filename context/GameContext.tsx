import { createContext, ReactNode, useContext, useState } from "react";

import { Difficulty } from "../types";

type GameContextType = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  score: number;
  setScore: (score: number) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setScore(0);
  };

  return (
    <GameContext.Provider
      value={{ difficulty, setDifficulty, score, setScore, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
