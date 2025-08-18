import { Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { TOTAL_QUESTIONS } from "../constants";
import { useGame } from "../context/GameContext";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types";

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

  return (
    <>
      <Text>
        Final score: {score} out of {TOTAL_QUESTIONS}
      </Text>
      <Button onPress={handleHomePress}>
        <ButtonText>Home</ButtonText>
      </Button>
    </>
  );
};
