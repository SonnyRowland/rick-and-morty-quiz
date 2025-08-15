import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "../types";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <Button
        onPress={() => navigation.navigate("Game")}
        title="Guessing Game"
      />
      ;
      <Button onPress={() => navigation.navigate("Trivia")} title="Trivia" />;
      <Button
        onPress={() => navigation.navigate("Characters")}
        title="View all characters"
      />
    </>
  );
};
