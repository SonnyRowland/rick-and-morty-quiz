import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import { Button, ButtonText } from "@/components/ui/button";
import { NavigationProp } from "@/types";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { styles } from "@/styles/HomeScreen.styles";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <ScreenWrapper>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.image}
          cachePolicy="memory-disk"
        />
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
