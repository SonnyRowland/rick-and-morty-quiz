import { Text } from "react-native";
import { useAllCharacters } from "../hooks/useAllCharacters";

export const TriviaScreen = () => {
  const { allCharacters } = useAllCharacters();

  if (allCharacters.length === 0) {
    return <Text>Loading...</Text>;
  }

  return <Text>total characters: {allCharacters.length}</Text>;
};
