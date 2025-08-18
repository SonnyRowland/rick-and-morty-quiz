import { ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";

import { CharacterType } from "@/types";
import { GET_CHARACTERS_BY_FILTER } from "@/graphql/queries/characters";
import client from "@/graphql/apolloClient";
import { useGame } from "@/context/GameContext";
import { useLazyQuery } from "@apollo/client";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { VStack } from "@/components/ui/vstack";

export const CharactersScreen = () => {
  const { allCharacters } = useGame();

  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [filter, setFilter] = useState("");

  const [getCharacters, { loading, data }] = useLazyQuery(
    GET_CHARACTERS_BY_FILTER
  );

  const resetCharacters = async () => {
    if (filter.trim() === "") {
      setCharacters(allCharacters);
    } else {
      await getCharacters({ variables: { filter: { name: filter } } });
    }
  };

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
          <Input>
            <InputField
              value={filter}
              onChangeText={(text) => setFilter(text)}
              style={{ backgroundColor: "white" }}
              onSubmitEditing={resetCharacters}
              autoCorrect={false}
            />
          </Input>
          <Button onPress={resetCharacters}>
            <ButtonText>Filter By Name</ButtonText>
          </Button>
        </VStack>
      </ScreenWrapper>
      {loading && <Text>Loading...</Text>}
      {characters.length === 0 && data && (
        <Text>No characters exist with that name</Text>
      )}
      {!loading &&
        characters.map((char) => <Text key={char.id}>{char.name}</Text>)}
    </ScrollView>
  );
};
