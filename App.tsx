import { ApolloProvider } from "@apollo/client";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import client from "./graphql/apolloClient";
import { Navigation } from "./navigation/RootNavigator";
import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <ApolloProvider client={client}>
        <GameProvider>
          <Navigation />
        </GameProvider>
      </ApolloProvider>
    </GluestackUIProvider>
  );
}
