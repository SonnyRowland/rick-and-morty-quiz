import { ApolloProvider } from "@apollo/client";
import { StyleSheet } from "react-native";

import client from "./graphql/apolloClient";
import { Navigation } from "./navigation/RootNavigator";
import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GameProvider>
        <Navigation />
      </GameProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
