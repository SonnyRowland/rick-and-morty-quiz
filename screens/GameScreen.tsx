import { Text } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_CHARACTER_NAME_LOCATION } from "../graphql/queries/characters";

const characterId = "12";

export const GameScreen = () => {
  const { data, loading, error } = useQuery(GET_CHARACTER_NAME_LOCATION, {
    variables: { id: characterId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return <Text>{JSON.stringify(data, null, 2)}</Text>;
};
