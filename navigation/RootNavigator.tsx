import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { GuessingGameScreen } from "../screens/GuessingGameScreen";
import { ResultsScreen } from "../screens/ResultsScreen";
import { TriviaScreen } from "../screens/TriviaScreen";
import { CharactersScreen } from "../screens/CharactersScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: HomeScreen },
    Game: { screen: GuessingGameScreen },
    Trivia: { screen: TriviaScreen },
    Results: { screen: ResultsScreen },
    Characters: { screen: CharactersScreen },
  },
});

export const Navigation = createStaticNavigation(RootStack);
