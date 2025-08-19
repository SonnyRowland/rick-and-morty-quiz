import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import { useApi } from "@/hooks/useApi";
import { useGame } from "@/context/GameContext";
import { NavigationProp } from "@/types";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { globalStyles } from "@/styles/index.styles";
import { Spinner } from "@/components/ui/spinner";

export const LoadingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setAllCharacters, setAllEpisodes, setAllLocations } = useGame();

  const { allCharacters, allEpisodes, allLocations } = useApi();

  // initialises values in GameContext
  useEffect(() => {
    if (
      allCharacters.length !== 0 &&
      allEpisodes.length !== 0 &&
      allLocations.length !== 0
    ) {
      setAllCharacters(allCharacters);
      setAllEpisodes(allEpisodes);
      setAllLocations(allLocations);

      navigation.replace("Home");
    }
  }, [allCharacters, allLocations, allEpisodes]);

  return (
    <ScreenWrapper>
      <Image
        source={require("@/assets/images/logo.png")}
        style={globalStyles.image}
        cachePolicy="memory-disk"
      />
      <Spinner size="large" />
    </ScreenWrapper>
  );
};
