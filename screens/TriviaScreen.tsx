import { Button, ScrollView, Text } from "react-native";
import { useState } from "react";

import { useAllCharacters } from "../hooks/useAllCharacters";
import { getCharacters } from "../utils/characterFilters";
import { useAllEpisodes } from "../hooks/useAllEpisodes";
import { getEpisodeQuestion } from "../utils/questionGenerator/episodeQuestions";
import { GameQuestion, NavigationProp } from "../types";
import { useGame } from "../context/GameContext";
import { TOTAL_QUESTIONS } from "../constants";
import { useNavigation } from "@react-navigation/native";

export const TriviaScreen = () => {
  const { difficulty, score, setScore } = useGame();
  const navigator = useNavigation<NavigationProp>();

  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const { allCharacters } = useAllCharacters();
  const { allEpisodes } = useAllEpisodes();

  if (allCharacters.length === 0 || allEpisodes.length === 0) {
    return <Text>Loading...</Text>;
  }

  const characters = getCharacters(allCharacters, difficulty);

  const generateNewQuestion = () => {
    const question = getEpisodeQuestion(characters, allEpisodes);
    setQuestion(question);

    const allAnswers = question.wrongAnswers.concat(question.correctAnswer);
    setAnswers(allAnswers.sort(() => 0.5 - Math.random()));

    setFeedback("");
  };

  const handleAnswer = (answer: string) => {
    setQuestionNumber((prev) => prev + 1);
    if (answer === question?.correctAnswer) {
      setScore(score + 1);
      setFeedback("CORRECT!");
    } else {
      setFeedback("WRONG WRONG WRONG");
    }

    if (questionNumber - 1 >= TOTAL_QUESTIONS) {
      navigator.navigate("Results");
    }
  };

  return (
    <ScrollView>
      <Button onPress={generateNewQuestion} title="Generate question" />
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
      <Text>
        {characters.map((char) => (
          <Text>
            {char.name}
            {"\n"}
          </Text>
        ))}
      </Text>
    </ScrollView>
  );
};
