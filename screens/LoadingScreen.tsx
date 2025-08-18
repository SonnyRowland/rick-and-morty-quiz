import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import { useAllLocations } from "../hooks/useAllLocations";
import { useAllCharacters } from "../hooks/useAllCharacters";
import { useAllEpisodes } from "../hooks/useAllEpisodes";
import { useGame } from "../context/GameContext";
import { NavigationProp } from "../types";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { styles } from "@/styles/LoadingScreen.styles";
import { Spinner } from "@/components/ui/spinner";

export const LoadingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setAllCharacters, setAllEpisodes, setAllLocations } = useGame();

  const { allCharacters } = useAllCharacters();
  const { allLocations } = useAllLocations();
  const { allEpisodes } = useAllEpisodes();

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
        style={styles.image}
        cachePolicy="memory-disk"
      />
      <Spinner size="large" />
    </ScreenWrapper>
  );
};
