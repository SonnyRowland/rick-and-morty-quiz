import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
