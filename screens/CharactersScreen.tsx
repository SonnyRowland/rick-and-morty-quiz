import { ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

import { CharacterType } from "@/types";
import { GET_CHARACTERS_BY_FILTER } from "@/graphql/queries/characters";
import { useGame } from "@/context/GameContext";
import { useLazyQuery } from "@apollo/client";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { VStack } from "@/components/ui/vstack";
import { CharacterCard } from "@/components/CharacterCard";
import { styles } from "@/styles/CharactersScreen.styles";
import { CloseIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";

export const CharactersScreen = () => {
  const { allCharacters } = useGame();

  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [filter, setFilter] = useState("");
  const [clearing, setClearing] = useState(false);

  const [getCharacters, { loading, data }] = useLazyQuery(
    GET_CHARACTERS_BY_FILTER
  );

  // calls api when filter submitted by user
  const resetCharacters = async () => {
    if (filter.trim() === "") {
      setCharacters(allCharacters);
    } else {
      await getCharacters({ variables: { filter: { name: filter } } });
    }
  };

  const clearAllFilters = () => {
    setClearing(true);
    setFilter("");
    setTimeout(() => {
      setCharacters(allCharacters);
      setClearing(false);
    }, 0);
  };

  // renders all characters on first load
  useEffect(() => {
    if (data?.characters?.results) {
      setCharacters(data.characters.results);
    } else {
      setCharacters(allCharacters);
    }
  }, [data, allCharacters]);

  return (
    <ScrollView>
      <ScreenWrapper>
        <VStack style={{ gap: 20 }}>
          <Input style={styles.input}>
            <InputField
              value={filter}
              onChangeText={(text) => setFilter(text)}
              onSubmitEditing={resetCharacters}
              autoCorrect={false}
            />
            <InputSlot className="pr-3" onPress={clearAllFilters}>
              <InputIcon as={CloseIcon} />
            </InputSlot>
          </Input>
          <Button onPress={resetCharacters}>
            <ButtonText>Filter By Name</ButtonText>
          </Button>
        </VStack>
      </ScreenWrapper>
      {(loading || clearing) && (
        <ScreenWrapper>
          <Spinner size="large" />
        </ScreenWrapper>
      )}
      {characters.length === 0 && data && !clearing && filter.trim() !== "" && (
        <ScreenWrapper>
          <Text>No characters exist with that name!</Text>
        </ScreenWrapper>
      )}
      {!loading && !clearing && (
        <VStack style={styles.stack}>
          {characters.map((char) => (
            <CharacterCard key={char.id} name={char.name} image={char.image} />
          ))}
        </VStack>
      )}
    </ScrollView>
  );
};
