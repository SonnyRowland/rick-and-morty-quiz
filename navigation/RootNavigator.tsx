import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { GameScreen } from "../screens/GameScreen";
import { ResultsScreen } from "../screens/ResultsScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
    Results: { screen: ResultsScreen },
  },
});

export const Navigation = createStaticNavigation(RootStack);
