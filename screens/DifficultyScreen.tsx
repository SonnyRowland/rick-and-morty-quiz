import { Button, Text } from "react-native";

import { useGame } from "../context/GameContext";
import { NavigationProp } from "../types";
import { useNavigation } from "@react-navigation/native";

export const DifficultyScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { difficulty, setDifficulty } = useGame();

  return (
    <>
      <Text>Select difficulty</Text>
      <Text>Current difficulty: {difficulty}</Text>
      <Button title="easy" onPress={() => setDifficulty("easy")} />
      <Button title="medium" onPress={() => setDifficulty("medium")} />
      <Button title="hard" onPress={() => setDifficulty("hard")} />
      <Button
        title="Start Game"
        onPress={() => navigation.navigate("Trivia")}
      />
    </>
  );
};
