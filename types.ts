import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CharacterType = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  episode: { id: string }[];
};

export type EpisodeType = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: { id: string }[];
};

export type QuestionType = "firstEpisode";

export type GameQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  image?: string;
  correctAnswer: string;
  wrongAnswers: string[];
};

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { finalScore: number; totalQuestions: number };
  Trivia: undefined;
  Characters: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
