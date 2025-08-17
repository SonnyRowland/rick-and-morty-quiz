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

export type LocationType = {
  id: string;
  name: string;
  residents: { id: string; name: string }[];
};

export type QuestionType = "firstEpisode" | "rightLocation";

export type Difficulty = "easy" | "medium" | "hard";

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
  Results: undefined;
  Trivia: undefined;
  Difficulty: undefined;
  Characters: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
