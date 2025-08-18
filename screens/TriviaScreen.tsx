import { Text } from "react-native";
import { useEffect, useState } from "react";
import { Button, ButtonText } from "@/components/ui/button";

import { getEpisodeQuestion } from "../utils/questionGenerator/episodeQuestions";
import { GameQuestion, NavigationProp } from "../types";
import { useGame } from "../context/GameContext";
import { TOTAL_QUESTIONS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { getLocationQuestion } from "../utils/questionGenerator/locationQuestions";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Heading } from "@/components/ui/heading";
import { styles } from "@/styles/TriviaScreen.styles";
import { Box } from "@/components/ui/box";

export const TriviaScreen = () => {
  const {
    score,
    setScore,
    allEpisodes,
    allLocations,
    availableCharacters,
    removeCharacter,
  } = useGame();
  const navigator = useNavigation<NavigationProp>();

  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    setQuestionNumber(1);
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    let newQuestion: GameQuestion;
    if (Math.random() < 0.5) {
      newQuestion = getEpisodeQuestion(availableCharacters, allEpisodes);
    } else {
      newQuestion = getLocationQuestion(availableCharacters, allLocations);
    }

    setQuestion(newQuestion);
    const allAnswers = newQuestion.wrongAnswers.concat(
      newQuestion.correctAnswer
    );
    setAnswers(allAnswers.sort(() => 0.5 - Math.random()));

    setFeedback("");
  };

  const handleAnswer = (answer: string) => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      navigator.navigate("Results");
      return;
    }

    if (question) {
      const questionCharacterId = question.id.replace("firstEpisode", "");
      removeCharacter(questionCharacterId);
    }

    setQuestionNumber((prev) => prev + 1);
    if (answer === question?.correctAnswer) {
      setScore(score + 1);
    }

    generateNewQuestion();
  };

  return (
    <ScreenWrapper>
      <Heading>Question {questionNumber}</Heading>
      {question && (
        <>
          <Box style={{ height: 40 }}>
            <Text style={{ textAlign: "center" }}>{question?.question}</Text>
          </Box>
          {answers.map((answer, index) => (
            <Button
              key={index}
              onPress={() => handleAnswer(answer)}
              style={styles.button}
            >
              <ButtonText style={styles.buttonText}>{answer}</ButtonText>
            </Button>
          ))}
        </>
      )}
      <Text>Score: {score}</Text>
      <Text>{feedback}</Text>
    </ScreenWrapper>
  );
};
