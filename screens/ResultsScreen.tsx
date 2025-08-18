import { Button, ButtonText } from "@/components/ui/button";
import { TOTAL_QUESTIONS } from "../constants";
import { useGame } from "../context/GameContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Heading } from "@/components/ui/heading";

export const ResultsScreen = () => {
  const { score, resetGame } = useGame();
  const navigator = useNavigation<NavigationProp>();

  const handleHomePress = () => {
    resetGame();
    navigator.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleTryAgainPress = () => {
    resetGame();
    navigator.reset({
      index: 0,
      routes: [{ name: "Trivia" }],
    });
  };

  return (
    <>
      <ScreenWrapper>
        <Heading size="xl">Final score:</Heading>
        <Heading size="3xl">
          {score} out of {TOTAL_QUESTIONS}
        </Heading>
        <Button>
          <ButtonText onPress={handleTryAgainPress}>Try Again</ButtonText>
        </Button>
        <Button onPress={handleHomePress}>
          <ButtonText>Home</ButtonText>
        </Button>
      </ScreenWrapper>
    </>
  );
};
