import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens/HomeScreen";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { ResultsScreen } from "@/screens/ResultsScreen";
import { TriviaScreen } from "@/screens/TriviaScreen";
import { CharactersScreen } from "@/screens/CharactersScreen";
import { DifficultyScreen } from "@/screens/DifficultyScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Loading: {
      screen: LoadingScreen,
      options: { headerShown: false },
    },
    Home: { screen: HomeScreen, options: { headerShown: false } },
    Difficulty: { screen: DifficultyScreen },
    Trivia: { screen: TriviaScreen },
    Results: { screen: ResultsScreen },
    Characters: { screen: CharactersScreen },
  },
});

export const Navigation = createStaticNavigation(RootStack);
