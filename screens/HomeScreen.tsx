import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "../types";
import { ScreenWrapper } from "@/components/ScreenWrapper";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <ScreenWrapper>
        <Button onPress={() => navigation.navigate("Difficulty")}>
          <ButtonText>Start Game</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate("Characters")}>
          <ButtonText>View All Characters</ButtonText>
        </Button>
      </ScreenWrapper>
    </>
  );
};
