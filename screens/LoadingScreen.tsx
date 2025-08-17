import { Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { useAllLocations } from "../hooks/useAllLocations";
import { useAllCharacters } from "../hooks/useAllCharacters";
import { useAllEpisodes } from "../hooks/useAllEpisodes";
import { useGame } from "../context/GameContext";
import { NavigationProp } from "../types";

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

  return <Text>Loading....</Text>;
};
