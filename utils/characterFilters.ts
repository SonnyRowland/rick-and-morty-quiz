import { CharacterType, Difficulty } from "../types";
import { DIFFICULTY_MIN_EPISODES } from "../constants";

export const getCharacters = (
  characters: CharacterType[],
  difficulty: Difficulty
): CharacterType[] => {
  const minEpisodes = DIFFICULTY_MIN_EPISODES[difficulty];
  return characters.filter((char) => char.episode.length >= minEpisodes);
};
