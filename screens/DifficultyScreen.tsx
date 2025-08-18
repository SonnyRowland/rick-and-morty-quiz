import { Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import { useGame } from "../context/GameContext";
import { NavigationProp } from "../types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export const DifficultyScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { difficulty, setDifficulty, resetGame } = useGame();

  useFocusEffect(
    useCallback(() => {
      resetGame();
    }, [resetGame])
  );

  return (
    <>
      <Text>Select difficulty</Text>
      <Text>Current difficulty: {difficulty}</Text>
      <Button onPress={() => setDifficulty("easy")}>
        <ButtonText>Easy</ButtonText>
      </Button>
      <Button onPress={() => setDifficulty("medium")}>
        <ButtonText>Medium</ButtonText>
      </Button>
      <Button onPress={() => setDifficulty("hard")}>
        <ButtonText>Hard</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("Trivia")}>
        <ButtonText>Start Game</ButtonText>
      </Button>
    </>
  );
};
