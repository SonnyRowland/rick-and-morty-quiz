import { Image, Text } from "react-native";
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
import { GameScreenModal } from "@/components/GameScreenModal";

export const TriviaScreen = () => {
  const {
    score,
    setScore,
    allEpisodes,
    allLocations,
    availableCharacters,
    removeCharacter,
    resetGame,
  } = useGame();
  const navigator = useNavigation<NavigationProp>();

  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(false);

  useEffect(() => {
    resetGame();
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
  };

  const handleAnswer = (answer: string) => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      navigator.reset({
        index: 0,
        routes: [{ name: "Results" }],
      });
      return;
    }

    if (question) {
      const questionCharacterId = question.id;
      removeCharacter(questionCharacterId);
    }

    setQuestionNumber((prev) => prev + 1);
    if (answer === question?.correctAnswer) {
      setResult(true);
      setScore(score + 1);
    } else {
      setResult(false);
    }

    setShowModal(true);

    generateNewQuestion();
  };

  return (
    <ScreenWrapper>
      <GameScreenModal
        showModal={showModal}
        setShowModal={setShowModal}
        result={result}
      />
      <Heading>Question {questionNumber}</Heading>
      {question && (
        <>
          <Box style={{ height: 40 }}>
            <Text style={{ textAlign: "center" }}>{question?.question}</Text>
          </Box>
          <Image source={{ uri: question.image }} style={styles.image} />
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
    </ScreenWrapper>
  );
};
