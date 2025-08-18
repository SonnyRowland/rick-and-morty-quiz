import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { Difficulty, CharacterType, EpisodeType, LocationType } from "../types";
import { getCharacters } from "../utils/characterFilters";

type GameContextType = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  score: number;
  setScore: (score: number) => void;
  allCharacters: CharacterType[];
  setAllCharacters: (characters: CharacterType[]) => void;
  allEpisodes: EpisodeType[];
  setAllEpisodes: (episodes: EpisodeType[]) => void;
  allLocations: LocationType[];
  setAllLocations: (locations: LocationType[]) => void;
  availableCharacters: CharacterType[];
  setAvailableCharacters: (characters: CharacterType[]) => void;
  removeCharacter: (characterId: string) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [score, setScore] = useState(0);
  const [allCharacters, setAllCharacters] = useState<CharacterType[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<EpisodeType[]>([]);
  const [allLocations, setAllLocations] = useState<LocationType[]>([]);
  const [availableCharacters, setAvailableCharacters] = useState<
    CharacterType[]
  >([]);

  const removeCharacter = (characterId: string) => {
    setAvailableCharacters((prev) =>
      prev.filter((char) => char.id !== characterId)
    );
  };

  const resetGame = useCallback(() => {
    setScore(0);
    setAvailableCharacters(getCharacters(allCharacters, difficulty));
  }, [difficulty]);

  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        score,
        setScore,
        allCharacters,
        setAllCharacters,
        allEpisodes,
        setAllEpisodes,
        allLocations,
        setAllLocations,
        availableCharacters,
        setAvailableCharacters,
        removeCharacter,
        resetGame,
      }}
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
