import { CharacterType, GameQuestion, LocationType } from "../../types";
import { getRandomItems, shuffleArray } from "./questionHelper";

export const getLocationQuestion = (
  characters: CharacterType[],
  locations: LocationType[]
): GameQuestion => {
  let targetChar = getRandomItems(characters, 1)[0];

  let charLocations = shuffleArray(
    locations.filter((location) =>
      location.residents.some((char) => char.id === targetChar.id)
    )
  );

  while (!charLocations.length) {
    targetChar = getRandomItems(characters, 1)[0];

    charLocations = shuffleArray(
      locations.filter((location) =>
        location.residents.some((char) => char.id === targetChar.id)
      )
    );
  }

  const rightLocation = charLocations[0];

  const otherLocations = locations.filter(
    (location) => location.id !== rightLocation.id
  );

  const wrongAnswers = getRandomItems(otherLocations, 3).map(
    (location) => location.name
  );

  return {
    id: targetChar.id,
    type: "rightLocation",
    question: `In which location might you find ${targetChar.name}?`,
    image: targetChar.image,
    correctAnswer: rightLocation.name,
    wrongAnswers,
  };
};
