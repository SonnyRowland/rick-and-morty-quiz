import { CharacterType } from "../types";

export const getPopularCharacters = (
  characters: CharacterType[],
  minEpisodes: number = 5
): CharacterType[] => {
  return characters.filter((char) => char.episode.length >= minEpisodes);
};
