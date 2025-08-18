import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "react-native";

import { useGame } from "../context/GameContext";
import { NavigationProp } from "@/types";
import { difficultyDescriptions, difficultyNumOfChars } from "@/constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Box } from "@/components/ui/box";

export const DifficultyScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { difficulty, setDifficulty, resetGame } = useGame();

  useFocusEffect(
    useCallback(() => {
      resetGame();
    }, [resetGame])
  );

  return (
    <ScreenWrapper>
      <Heading>Select difficulty</Heading>
      <VStack style={{ gap: "20" }}>
        <Button
          onPress={() => setDifficulty("easy")}
          variant={difficulty === "easy" ? "solid" : "outline"}
        >
          <ButtonText>Easy</ButtonText>
        </Button>
        <Button
          onPress={() => setDifficulty("medium")}
          variant={difficulty === "medium" ? "solid" : "outline"}
        >
          <ButtonText>Medium</ButtonText>
        </Button>
        <Button
          onPress={() => setDifficulty("hard")}
          variant={difficulty == "hard" ? "solid" : "outline"}
        >
          <ButtonText>Hard</ButtonText>
        </Button>
      </VStack>

      <Box style={{ height: 60, justifyContent: "center", gap: 4 }}>
        <Text style={{ textAlign: "center" }}>
          {difficultyDescriptions[difficulty]}
        </Text>
        <Text style={{ textAlign: "center" }}>
          Test your knowledge with {difficultyNumOfChars[difficulty]} characters
        </Text>
      </Box>

      <Button onPress={() => navigation.navigate("Trivia")}>
        <ButtonText>Start Game</ButtonText>
        <ButtonText style={{ color: "white" }}>→</ButtonText>
      </Button>
    </ScreenWrapper>
  );
};
