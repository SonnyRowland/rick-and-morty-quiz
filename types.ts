import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Results: { finalScore: number; totalQuestions: number };
  Trivia: undefined;
  Characters: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
