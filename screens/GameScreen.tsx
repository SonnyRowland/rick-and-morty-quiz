import { Text, Image, TextInput, Button } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import { GET_RANDOM_CHARACTER } from "../graphql/queries/characters";
import { styles } from "../styles/GameScreen.styles";
import { NavigationProp } from "../types";

const TOTAL_QUESTIONS = 10;

export const GameScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [guess, onChangeGuess] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [feedback, setFeedback] = React.useState("");
  const [randomId, setRandomId] = React.useState(
    () => Math.floor(Math.random() * 826) + 1
  );

  const { data, loading, error } = useQuery(GET_RANDOM_CHARACTER, {
    variables: { id: randomId.toString() },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  const handleGuess = () => {
    const isCorrect =
      guess.toLowerCase().trim() === data.character.name.toLowerCase();

    if (isCorrect) {
      setScore((score) => score + 1);
      setFeedback("Well done!");
    } else {
      setFeedback(`Wrong! It was ${data.character.name}`);
    }

    if (currentQuestion >= TOTAL_QUESTIONS) {
      navigation.navigate("Results", {
        finalScore: score,
        totalQuestions: TOTAL_QUESTIONS,
      });
    }

    setCurrentQuestion((prev) => prev + 1);
    setRandomId(Math.floor(Math.random() * 826) + 1);
    onChangeGuess("");
  };

  return (
    <>
      <Text>
        Question {currentQuestion} of {TOTAL_QUESTIONS}
      </Text>
      <Text>Hint: {data.character.name}</Text>
      <Image
        source={{ uri: data.character.image }}
        style={styles.characterImage}
      />
      <TextInput
        value={guess}
        onChangeText={onChangeGuess}
        style={styles.input}
      />
      <Button title="Guess!" onPress={() => handleGuess()} />
      <Text>{feedback}</Text>
      <Text>Score: {score}</Text>
    </>
  );
};
