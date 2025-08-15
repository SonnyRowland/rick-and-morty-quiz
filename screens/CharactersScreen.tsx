import { Image, ScrollView, Text } from "react-native";

import { useAllCharacters } from "../hooks/useAllCharacters";
import { styles } from "../styles/CharactersScreen.styles";

export const CharactersScreen = () => {
  const { allCharacters } = useAllCharacters();

  if (allCharacters.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      {allCharacters.map((char) => (
        <>
          <Text>{char.name}</Text>
          <Image
            source={{ uri: char.image }}
            style={styles.characterImage}
            key={char.id}
          />
        </>
      ))}
    </ScrollView>
  );
};
