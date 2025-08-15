import { Text } from "react-native";

type Props = {
  route: {
    params: {
      finalScore: number;
      totalQuestions: number;
    };
  };
};

export const ResultsScreen = ({ route }: Props) => {
  const { finalScore, totalQuestions } = route.params;

  return (
    <Text>
      Final score: {finalScore} out of {totalQuestions}
    </Text>
  );
};
