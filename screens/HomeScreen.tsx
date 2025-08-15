import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "../types";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return <Button onPress={() => navigation.navigate("Game")} title="Vamos" />;
};
