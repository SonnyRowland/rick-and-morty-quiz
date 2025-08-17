import { CharacterType, EpisodeType, GameQuestion } from "../../types";
import { getRandomItems } from "./questionHelper";

export const getEpisodeQuestion = (
  characters: CharacterType[],
  episodes: EpisodeType[]
): GameQuestion => {
  const targetChar = getRandomItems(characters, 1)[0];

  const charEpisodes = episodes.filter((episode) =>
    episode.characters.some((char) => char.id === targetChar.id)
  );

  const sortedEpisodes = charEpisodes.sort(
    (a, b) => new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
  );

  const firstEpisode = sortedEpisodes[0];

  const otherEpisodes = episodes.filter(
    (episode) => episode.id !== firstEpisode.id
  );
  const wrongAnswers = getRandomItems(otherEpisodes, 3).map(
    (episode) => episode.episode
  );

  return {
    id: targetChar.id,
    type: "firstEpisode",
    question: `Which episode did ${targetChar.name} first appear in?`,
    image: targetChar.image,
    correctAnswer: firstEpisode.episode,
    wrongAnswers,
  };
};
