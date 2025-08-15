import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { GameScreen } from "../screens/GameScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
  },
});

export const Navigation = createStaticNavigation(RootStack);
