import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState, useCallback } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { NavigationProp } from "@/types";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { globalStyles } from "@/styles/index.styles";
import { Spinner } from "@/components/ui/spinner";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoadingCharacters(false);
    }, [])
  );

  return (
    <>
      <ScreenWrapper>
        <Image
          source={require("@/assets/images/logo.png")}
          style={globalStyles.image}
          cachePolicy="memory-disk"
        />
        <Button onPress={() => navigation.navigate("Difficulty")}>
          <ButtonText>Start Game</ButtonText>
        </Button>
        <Button
          onPress={() => {
            setLoadingCharacters(true);
            requestAnimationFrame(() => {
              navigation.navigate("Characters");
            });
          }}
          disabled={loadingCharacters}
        >
          {loadingCharacters ? (
            <Spinner size="small" />
          ) : (
            <ButtonText>View All Characters</ButtonText>
          )}
        </Button>
      </ScreenWrapper>
    </>
  );
};
