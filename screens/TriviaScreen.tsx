import { Button, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

import { useAllCharacters } from "../hooks/useAllCharacters";
import { getCharacters } from "../utils/characterFilters";
import { useAllEpisodes } from "../hooks/useAllEpisodes";
import { getEpisodeQuestion } from "../utils/questionGenerator/episodeQuestions";
import { GameQuestion, NavigationProp } from "../types";
import { useGame } from "../context/GameContext";
import { TOTAL_QUESTIONS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { getLocationQuestion } from "../utils/questionGenerator/locationQuestions";
import { useAllLocations } from "../hooks/useAllLocations";

export const TriviaScreen = () => {
  const {
    difficulty,
    score,
    setScore,
    availableCharacters,
    setAvailableCharacters,
    removeCharacter,
  } = useGame();
  const navigator = useNavigation<NavigationProp>();

  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const { allCharacters } = useAllCharacters();
  const { allEpisodes } = useAllEpisodes();
  const { allLocations } = useAllLocations();

  useEffect(() => {
    if (allCharacters.length > 0 && allEpisodes.length > 0) {
      const characters = getCharacters(allCharacters, difficulty);
      setAvailableCharacters(characters);
      setQuestionNumber(1);
    }
  }, [allCharacters, allEpisodes, difficulty]);

  useEffect(() => {
    if (availableCharacters.length > 0 && allEpisodes.length > 0) {
      generateNewQuestion();
    }
  }, [availableCharacters, allEpisodes]);

  if (
    allCharacters.length === 0 ||
    allEpisodes.length === 0 ||
    availableCharacters.length === 0
  ) {
    return <Text>Loading...</Text>;
  }

  const generateNewQuestion = () => {
    if (availableCharacters.length === 0) {
      navigator.navigate("Results");
      return;
    }

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
      setFeedback("CORRECT!");
    } else {
      setFeedback("WRONG WRONG WRONG");
    }

    generateNewQuestion();
  };

  return (
    <ScrollView>
      <Text>Current Question: {questionNumber}</Text>
      {question && (
        <>
          <Text>{question?.question}</Text>
          {answers.map((answer, index) => (
            <Button
              key={index}
              title={answer}
              onPress={() => handleAnswer(answer)}
            />
          ))}
        </>
      )}
      <Text>Score: {score}</Text>
      <Text>{feedback}</Text>
    </ScrollView>
  );
};
