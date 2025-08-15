import { Button, ScrollView, Text } from "react-native";
import { useState } from "react";

import { useAllCharacters } from "../hooks/useAllCharacters";
import { getPopularCharacters } from "../utils/characterFilters";
import { useAllEpisodes } from "../hooks/useAllEpisodes";
import { getEpisodeQuestion } from "../utils/questionGenerator/episodeQuestions";
import { GameQuestion } from "../types";

export const TriviaScreen = () => {
  const [question, setQuestion] = useState<GameQuestion | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  const { allCharacters } = useAllCharacters();
  const { allEpisodes } = useAllEpisodes();

  if (allCharacters.length === 0 || allEpisodes.length === 0) {
    return <Text>Loading...</Text>;
  }

  const popularChars = getPopularCharacters(allCharacters, 5);

  const generateNewQuestion = () => {
    const question = getEpisodeQuestion(popularChars, allEpisodes);
    setQuestion(question);

    const allAnswers = question.wrongAnswers.concat(question.correctAnswer);
    setAnswers(allAnswers.sort(() => 0.5 - Math.random()));

    setFeedback("");
  };

  const handleAnswer = (answer: string) => {
    if (answer === question?.correctAnswer) {
      setFeedback("CORRECT!");
    } else {
      setFeedback("WRONG WRONG WRONG");
    }
  };

  return (
    <ScrollView>
      <Button onPress={generateNewQuestion} title="Generate question" />
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
      <Text>{feedback}</Text>
    </ScrollView>
  );
};
