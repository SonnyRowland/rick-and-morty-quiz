import { Text } from "react-native";
import { TOTAL_QUESTIONS } from "../constants";
import { useGame } from "../context/GameContext";

type Props = {
  route: {
    params: {
      finalScore: number;
      totalQuestions: number;
    };
  };
};

export const ResultsScreen = ({ route }: Props) => {
  const { score } = useGame();

  return (
    <Text>
      Final score: {score} out of {TOTAL_QUESTIONS}
    </Text>
  );
};
