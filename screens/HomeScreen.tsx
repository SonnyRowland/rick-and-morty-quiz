import { Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "../types";
import { useGame } from "../context/GameContext";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { allCharacters, allLocations, allEpisodes } = useGame();

  return (
    <>
      <Button
        onPress={() => navigation.navigate("Game")}
        title="Guessing Game"
      />
      <Button
        onPress={() => navigation.navigate("Difficulty")}
        title="Trivia"
      />
      <Button
        onPress={() => navigation.navigate("Characters")}
        title="View All Characters
        "
      />
    </>
  );
};
